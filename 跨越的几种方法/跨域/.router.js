function setRouter(app){ 
 var router = app; 



app.get('/getNews', function(req, res){
    var news = [
        "第1日前瞻，中国冲击11金，博尔特再战",
        "第2日前瞻，中国冲击22金，刘翔再战",
        "第3日前瞻，中国冲击33金，姚明再战",
        "第4日前瞻，中国冲击44金，易建联再战",
        "第5日前瞻，中国冲击55金，李小鹏再战",
        "第6日前瞻，中国冲击66金，xxx再战",
        "第7日前瞻，中国冲击77金，sss再战",
        "第8日前瞻，中国冲击88金，qqq再战",
    ];
    var data = [];
    for(var i=0; i<3; i++){
        var index = parseInt(Math.random()*news.length);
        data.push(news[index]);
        news.splice(index, 1);
    }

    res.header("Access-Control-Allow-origin", "http://a.jrg.com:8080");
    //res.header("Access-Control-Allow-origin","*");
    res.send(data)
});}
 module.exports.setRouter = setRouter