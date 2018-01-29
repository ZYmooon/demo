function setRouter(app){ 
 var router = app; 

app.get('/getNews', function (req, res) {
    var news = [{
        link: 'https://xw.qq.com/zt/2017090112018831/NEW2017090112018831',
        img: 'https://inews.gtimg.com/newsapp_ls/0/2156536836_150120/0',
        time: '30分钟前',
        title: '十九大召开在即 9张图读懂18次党代会“极简史”',
        address: '人民日报'
    },
        {
            link: 'https://xw.qq.com/TWF/20171013026598/TWF2017101302659802',
            img: 'https://inews.gtimg.com/newsapp_bt/0/2156638961/1000',
            time: '40分钟前',
            title: '台风“卡努”向南海趋近 或在海南广东沿海登陆',
            address: '海南日报'
        },
        {
            link: 'https://xw.qq.com/cmsid/20171011A02WHP00',
            img: 'https://inews.gtimg.com/newsapp_bt/0/2113010892/1000',
            time: '50分钟前',
            title: '又一次重大跨越，展望中俄联合研制的CR929宽体客机',
            address: '河北日报'
        },
        {
            link: 'https://xw.qq.com/cmsid/20171013A015H900',
            img: 'https://inews.gtimg.com/newsapp_bt/0/2156579236/1000',
            time: '60分钟前',
            title: '俩美国人在叙被扣，求助美军特种部队不仅被拒还遭虐待',
            address: '神州日报'
        },
        {
            link: 'https://xw.qq.com/zt/2017090112018831/NEW2017090112018831',
            img: 'https://inews.gtimg.com/newsapp_ls/0/2156536836_150120/0',
            time: '1小时前',
            title: '十九大召开在即 9张图读懂18次党代会“极简史”',
            address: '北京日报'
        },
        {
            link: 'https://xw.qq.com/zt/2017090112018831/NEW2017090112018831',
            img: 'https://inews.gtimg.com/newsapp_ls/0/2156536836_150120/0',
            time: '1小时前',
            title: '十九大召开在即 9张图读懂18次党代会“极简史”',
            address: '长沙日报'
        },
        {
            link: 'https://xw.qq.com/NEW/20171013007314/NEW2017101300731403',
            img: 'https://inews.gtimg.com/newsapp_bt/0/2156314484/1000',
            time: '2小时前',
            title: '泰国总理见完特朗普，就宣布购买了中国坦克',
            address: '海外网'
        },
        {
            link: 'https://xw.qq.com/cmsid/20171012A01K7S00',
            img: 'https://inews.gtimg.com/newsapp_bt/0/2152413721/1000',
            time: '3小时前',
            title: '中国船侦察关岛附近水文，美军只能远远观望',
            address: '中国新闻网'
        }
    ];

    var pageIndex = req.query.page;
    var newsLength = 2;

    var retNews = news.slice(pageIndex * newsLength, pageIndex * newsLength + newsLength);

    res.send({
        status: 0,
        data: retNews
    });
});}
 module.exports.setRouter = setRouter