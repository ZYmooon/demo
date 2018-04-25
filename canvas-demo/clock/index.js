function draw() {
  var canvas = document.querySelector("#canvas");
  var ctx = canvas.getContext("2d");
  var originx = 400;
  var originy = 200;
  var radius = 150;
  var audio = document.getElementById("audio")

  audio.ontimeupdate = function () {
    if(audio.currentTime >= 0.2){
      audio.pause()
    }
  }

  setInterval(function() {
    ctx.clearRect(0,0,800,500)
    audio.currentTime = 0;
    audio.play();

    ctx.shadowColor = "#888";
    ctx.shadowOffsetx = 1;
    ctx.shadowOffsety = 1;
    ctx.shadowBlur = 3;
    var colorObj = ctx.createRadialGradient(
      originx,
      originy,
      10,
      originx,
      originy,
      500
    );

    //画表盘
    colorObj.addColorStop(0, "pink");
    colorObj.addColorStop(0.5, "blue");
    colorObj.addColorStop(1, "green");
    ctx.fillStyle = colorObj;
    ctx.lineWidth = 0;
    ctx.beginPath();
    ctx.strokeStyle = colorObj;
    ctx.arc(originx, originy, radius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();

    ctx.shadowColor = "#888";
    ctx.shadowOffsetx = 0;
    ctx.shadowOffsety = 0;
    ctx.shadowBlur = 0;

    //获取时间
    var date = new Date();
    var ho = date.getHours() * 30 + date.getMinutes() / 12 - 90;
    var mi = date.getMinutes() * 6 - 90;
    var se = date.getSeconds() * 6 - 90;

    //时针
    drawPointer(60, ho, 8, "red");
    //分钟
    drawPointer(80, mi, 4, "#000");
    //秒针
    drawPointer(110, se, 2, "white");

    //中心圆点
    ctx.fillStyle = "grey";
    ctx.beginPath();
    ctx.arc(originx, originy, 6, 0, 2 * Math.PI);
    ctx.fill();
    

    //画指针函数
    function drawPointer(radius, angle, width, color) {
      ctx.lineWidth = width;
      ctx.strokeStyle = color;
      ctx.beginPath();
      ctx.moveTo(originx, originy);
      ctx.lineTo(
        originx + radius * Math.cos(angle * Math.PI / 180),
        originy + radius * Math.sin(angle * Math.PI / 180)
      );
      ctx.stroke();
    }

    drawMark();
  }, 1000);


  //画刻度
  function drawMark() {
    for (var i = 0; i < 60; i++) {
      var angle = i * 6 * Math.PI / 180;
      var radius1 = radius - 10;
      var lw = 3;
      if (i % 5 === 0) {
        radius1 = radius - 18;
        lw = 8;
      }
      ctx.strokeStyle = "black";
      ctx.lineWidth = lw;
      ctx.beginPath();
      ctx.moveTo(
        originx + radius * Math.cos(angle),
        originy + radius * Math.sin(angle)
      );
      ctx.lineTo(
        originx + radius1 * Math.cos(angle),
        originy + radius1 * Math.sin(angle)
      );
      ctx.stroke();
    }
  }
}

draw();
