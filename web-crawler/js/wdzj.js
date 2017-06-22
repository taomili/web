/**
 * Created by taomili on 2017/6/13.
 */
var request = require('request');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

var options = {
    referrer: "http://www.wdzj.com/dangan/",
    userAgent: "Mellblomenator/9000",
    includeNodeLocations: true
};
var url = 'http://www.wdzj.com/front_select-plat?currPage=';
var page=1;
for (var i = 1; i <=1; i++) {
    var tmpurl =url+i;
    request(tmpurl,function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var obj = JSON.parse(body);
            if (i == 1) {
                page = obj.totalPage;
            }
            if (obj.list.length > 0) {
                execueList(obj.list,i);
            }
        }
    })
    //console.log(tmpurl);
}
/**
 * 平台名称
 * 公司基本信息 企业名称	上线时间	注册地址（注册省份）	网站备案域名
 * 评级  发展指数	排名
 * 平台实力  注册资金	银行存管	融资记录	监管协会	ICP号	保障模式	风险准备金存管	平台背景（银行系 上市系等）
 * 投资数据（近30天数据）	平均参考收益	成交量	投资人数	借款人数	日资金净流入	日待还余额
 * 业务类型（消费金融 供应链金融等）
 * 高管信息  姓名	职务
 * 联系方式 服务电话	座机电话	服务邮箱	办公地址
 * 公司简介
 * @param obj
 * @param n
 */
function execueList(obj,n){
    console.log('=====================page:'+n+'=====================');
    for(var i=0;i<1;i++){
        //obj[i].platName + ":http://www.wdzj.com/dangan/" +obj[i].platNamePin

         var platurl ='http://www.wdzj.com/dangan/hyd8';//+obj[i].platNamePin;
        JSDOM.fromURL(platurl, options).then(dom => {
            //console.log(dom.serialize());
            console.log('===========' + obj[i].platName + '==========公司基本信息============div.da-ggxx=========');
        //console.log(dom.window.document.querySelector("div.da-ggxx").innerHTML);
        var ggxx = dom.window.document.querySelectorAll("div.da-ggxx");
        console.log(ggxx);
        if(ggxx.length>0){
            var gx1 = ggxx[0].querySelectorAll("tr");
            // for (var m=0;m<gx1.length;m++){
            //     var tmpTd=gx1[m].querySelectorAll("td");
            //     console.log(tmpTd[0].textContent +":"+tmpTd[1].textContent.trim());
            //
            // }
            //企业名称
            var entName = gx1[0].querySelectorAll("td");
            console.log(entName[0].textContent + ":" + entName[1].textContent.trim());
            // 上线时间 div.header-da-rt  span[1].em
            var entInfo = dom.window.document.querySelector("div.header-da-rt").querySelectorAll("span");
            console.log("上线时间：" + entInfo[1].querySelector("em").textContent.trim());
            // 注册地址（注册省份）上线时间 div.header-da-rt  span[0].em
            console.log("注册地址：" + entInfo[0].querySelector("em").textContent.trim());
            // 网站备案域名
            //     for (var m=0;m<gx2.length;m++){
            //         var tmpTd=gx2[m].querySelectorAll("td");
            //         console.log(tmpTd[0].textContent +":"+tmpTd[1].textContent.trim());
            //
            //     }
            if (ggxx[1] != undefined) {

            var gx2 = ggxx[1].querySelectorAll("tr");
            var beian = gx2[0].querySelectorAll("td");
            console.log(beian[0].textContent + ":" + beian[1].textContent.trim());
            }else { }
        }else{

        }
        console.log('===========' + obj[i].platName + '==========评级=====================');
        //console.log('===========' + platName + '==========评级====================='+arr.length);
        //发展指数
        var fzzs = dom.window.document.querySelector("div.header-da-rt").querySelector("div.on1").querySelector("b");
        if (fzzs != null) {
            console.log(fzzs.textContent);
        }else{}
        //排名
        var paiming = dom.window.document.querySelector("div.header-da-rt").querySelector("div.on2").querySelector("em");
        if(paiming!=null) {
            console.log(paiming.textContent);
        }else{}

        console.log('===========' + obj[i].platName + '==========平台实力=====================');
        var ptgl = dom.window.document.querySelector("div.dabox-left").querySelectorAll("dd");
        //注册资金
        var zczj = ptgl[0].querySelector("div.r").textContent.trim().replace(" ", "");
        console.log("注册资金: " + zczj);

        // 银行存管
        var yhcg = ptgl[1].querySelector("div.r").textContent.trim();
        console.log("银行存管: " + yhcg);
        // 融资记录
        var rzjl = ptgl[2].querySelector("div.r").textContent.trim();
        console.log("融资记录: " + rzjl);
        // 监管协会
        var jgxh = ptgl[3].querySelector("div.r").textContent.trim();
        console.log("监管协会: " + jgxh);
        // ICP号
        var icp = ptgl[4].querySelector("div.r").textContent.trim();
        console.log("ICP号: " + icp);
        // 保障模式
        var bzms = ptgl[8].querySelector("div.r").textContent.trim();
        console.log("保障模式: " + bzms);
        // 风险准备金存管
        var fx = ptgl[9].querySelector("div.r").textContent.trim();
        console.log("风险准备金存管: " + fx);
        // 平台背景（银行系 上市系等）
        var ptbj = dom.window.document.querySelector("div.header-da-rt").querySelector("div.bq-box").textContent.trim();
        console.log("平台背景：" + ptbj);

        console.log('===========' + obj[i].platName + '==========投资数据=====================');
        var tzsj = dom.window.document.querySelector("div.header-da-rb").querySelectorAll("dd");
        // for (var m=0;m<tzsj.length;m++){
        //     console.log(tzsj[m].querySelector("span").textContent +":"+ tzsj[m].querySelector("em").textContent);
        // }
        //平均参考收益
        console.log(tzsj[0].querySelector("span").textContent + ":" + tzsj[0].querySelector("em").textContent);
        // 成交量
        console.log(tzsj[2].querySelector("span").textContent + ":" + tzsj[2].querySelector("em").textContent);
        // 投资人数
        console.log(tzsj[3].querySelector("span").textContent + ":" + tzsj[3].querySelector("em").textContent);
        // 借款人数
        console.log(tzsj[4].querySelector("span").textContent + ":" + tzsj[4].querySelector("em").textContent);
        // 日资金净流入
        console.log(tzsj[5].querySelector("span").textContent + ":" + tzsj[5].querySelector("em").textContent);
        // 日待还余额
        console.log(tzsj[6].querySelector("span").textContent + ":" + tzsj[6].querySelector("em").textContent);
        console.log('===========' + obj[i].platName + '==========业务类型========div.chartBox_l=======tspan======');
        console.log(dom.window.document.querySelectorAll("div.common-header-nav").innerHTML);
        // var yylxDom = dom.window.document.querySelectorAll("div.chartBox_l")[2].querySelector("g.highcharts-legend").querySelectorAll("tspan");
        // var yylxDom = dom.window.document.querySelectorAll("div.highcharts-container")[2];
        // console.log(yylxDom.innerText);
        // for (var m=0;m<yylxDom.length;m++){
        //     console.log(yylxDom[0].textContent);
        // }


        console.log('===========' + obj[i].platName + '==========高管信息========url.gglist   a span|p=============');
        var ggxx = dom.window.document.querySelectorAll("ul.gglist a");
        for (var m = 0; m < ggxx.length; m++) {
                console.log(ggxx[m].querySelector("span").textContent + ":" + ggxx[m].querySelector("p").textContent);
        }
        console.log('==========='+obj[i].platName+'==========联系方式========div.da-lxfs dd div[0]-em|div[1]=============');
        var lxfs = dom.window.document.querySelectorAll("div.da-lxfs dd");
        console.log(lxfs.length);
        console.log(lxfs[2].querySelector("em").textContent);
        var isqq = lxfs[2].querySelector("em").textContent.indexOf('QQ');
        console.log(isqq);
        //服务电话
       console.log(lxfs[0].querySelector("em").textContent+":"+lxfs[0].querySelector("div.r").textContent.trim());
        // 座机电话
        if(isqq>0){
            console.log(lxfs[5].querySelector("em").textContent+":"+lxfs[5].querySelector("div.r").textContent.trim());
        }else{
            console.log(lxfs[4].querySelector("em").textContent+":"+lxfs[4].querySelector("div.r").textContent.trim());
        }

        // 服务邮箱
        console.log(lxfs[1].querySelector("em").textContent+":"+lxfs[1].querySelector("div.r").textContent.trim());
        // 办公地址
            if(isqq>0){
                console.log(lxfs[3].querySelector("em").textContent+":"+lxfs[3].querySelector("div.r").textContent.trim());
            }else{
                console.log(lxfs[2].querySelector("em").textContent+":"+lxfs[2].querySelector("div.r").textContent.trim());
            }
        console.log(dom.window.document.querySelector("div.cen-zk").textContent);
        });

       // console.log(platurl);
    }


}