
app.get('/getNews', function(req, res){
    var news = [
        "这是第一条新闻，发布于2017年1月1日",
        "今天是5.1劳动节，你今天劳动了吗",
        "端午节吃粽子是中国人的习俗，你吃了吗",
        "国庆节放8天假，包括中秋的一天，你玩开心了吗",
        "哎，还有几个月就要过年啦",
        "今天下雨，不是个好日子",
        "啥打法书法课fjasjdfa这的乱打的字",
        "我只在不知道要说什么了，就这样吧"
    ];
    var data = [];
    for(var i=0; i<3; i++){
        var index = parseInt(Math.random()*news.length);
        data.push(news[index]);
        news.splice(index, 1);
    }

    res.header("Access-Control-Allow-origin", "http://a.com:8080");
    //res.header("Access-Control-Allow-origin","*");
    res.send(data)
});