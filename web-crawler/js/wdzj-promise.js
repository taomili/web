/**
 * Created by taomili on 2017/6/13.
 */
//var request = require('request');
var syncRequest = require('sync-request');

const jsdom = require("jsdom");
const { JSDOM } = jsdom;
var options = {
    referrer: "http://www.wdzj.com/dangan/",
    userAgent: "Mellblomenator/9000",
    includeNodeLocations: true
};
var url = 'http://www.wdzj.com/front_select-plat?currPage=';
var page=1;
function sleep(time){
    return new Promise(function(resolve,reject){
        setTimeout(function(){
            resolve('ok');
        },time);
    })
}
var xlsx = require('node-xlsx');
var fs = require('fs');
var urlArry = [];
var wdzjData=[];
var titile=['平台名称','企业名称','上线时间','注册地址（注册省份）','网站备案域名','发展指数','排名','注册资金','银行存管','融资记录','监管协会','ICP号','保障模式','风险准备金存管','平台背景（银行系 上市系等）','平均参考收益','成交量','投资人数','借款人数','日资金净流入','日待还余额','业务类型（消费金融 供应链金融等）','高管信息','服务电话','座机电话','服务邮箱','办公地址','公司简介'];
wdzjData.push(titile);
startSpider();


async function startSpider() {
    var start = new Date().getTime();
    for (var i = 161; i <= 188; i++) {
    //for (var i =31; i <= 31; i++) {

        if(i%2==0){
            console.log(i+":s t"+new Date().getTime());
            await sleep(1000);
            console.log(i+":e d"+new Date().getTime());
        }
        var tmpurl = url + i;
        var res = syncRequest('GET', tmpurl);
        var obj = JSON.parse(res.getBody().toString());
        if (i == 1) {
            page = obj.totalPage;
        }
        for (var j = 0; j < obj.list.length; j++) {
            if (obj.list[j] != null) {
                urlArry.push("http://www.wdzj.com/dangan/" + obj.list[j].platNamePin);
            }
        }

    }
     if (urlArry.length > 0) {
        execueList1(urlArry);
     }
}




async function execueList1(urlArry) {
    console.log("urlArry.length:"+urlArry.length);
    var start = new Date().getTime();
    for (var i=0;i<urlArry.length;i++){
       if(i%20==0){
            console.log("start sleep:"+new Date().getTime());
            await sleep(2000);
            console.log("end sleep:"+new Date().getTime());
        }
        console.log(i+":"+urlArry[i]);
        await new Promise(function(resolve, reject){
            JSDOM.fromURL(urlArry[i], options).then(dom =>{

            var arr=[];
            var platName = dom.window.document.querySelector("div.header-da-rt").querySelector("div.title").querySelector("h1").textContent;
            arr.push(platName);
            //console.log('===========' + platName + '==========公司基本信息============div.da-ggxx========='+arr.length);
            var ggxx = dom.window.document.querySelectorAll("div.da-ggxx");
            if(ggxx[0]!=undefined) {
                var gx1 = ggxx[0].querySelectorAll("tr");
                //企业名称
                var entName = gx1[0].querySelectorAll("td");
                arr.push(entName[1].textContent.trim());
                // 上线时间 div.header-da-rt  span[1].em
                var entInfo = dom.window.document.querySelector("div.header-da-rt").querySelectorAll("span");
                arr.push(entInfo[1].querySelector("em").textContent.trim());
                // 注册地址（注册省份）上线时间 div.header-da-rt  span[0].em
                arr.push(entInfo[0].querySelector("em").textContent.trim());
            }else{
                arr.push("");
                arr.push("");
                arr.push("");
            }
            // 网站备案域名
            if(ggxx[1]!=undefined){
                var gx2 = ggxx[1].querySelectorAll("tr");
                var beian = gx2[0].querySelectorAll("td");
                arr.push(beian[1].textContent.trim());
            }else{
                arr.push("");
            }
            //console.log('===========' + platName + '==========评级====================='+arr.length);
            //发展指数
            var fzzs = dom.window.document.querySelector("div.header-da-rt").querySelector("div.on1").querySelector("b");
            if (fzzs != null) {
                arr.push(fzzs.textContent);
            }else{arr.push("");}
            //排名
            var paiming = dom.window.document.querySelector("div.header-da-rt").querySelector("div.on2").querySelector("em");
            if(paiming!=null) {
                arr.push(paiming.textContent);
            }else{arr.push("");}
            //console.log('===========' +platName + '==========平台实力====================='+arr.length);
            var ptgl = dom.window.document.querySelector("div.dabox-left").querySelectorAll("dd");
            //注册资金
            var zczj = ptgl[0].querySelector("div.r").textContent.trim().replace(" ", "");
            arr.push(zczj);
            // 银行存管
            var gqss = ptgl[1].querySelector("div").textContent.trim();
            if(gqss.indexOf("上市")>0){
                yhcg = ptgl[2].querySelector("div.r").textContent.trim();
                arr.push(yhcg);
                /// 融资记录
                var rzjl = ptgl[3].querySelector("div.r").textContent.trim();
                arr.push(rzjl);
                // 监管协会
                var jgxh = ptgl[4].querySelector("div.r").textContent.trim();
                arr.push(jgxh);
                // ICP号
                var icp = ptgl[5].querySelector("div.r").textContent.trim();
                arr.push(icp);
                // 保障模式
                var bzms = ptgl[9].querySelector("div.r").textContent.trim();
                arr.push(bzms);
                // 风险准备金存管
                var fx = ptgl[10].querySelector("div.r").textContent.trim();
                arr.push(fx);
                // 平台背景（银行系 上市系等）
                var ptbj = dom.window.document.querySelector("div.header-da-rt").querySelector("div.bq-box").textContent.trim();
                arr.push(ptbj);
            }else{
                var yhcg = ptgl[1].querySelector("div.r").textContent.trim();
                arr.push(yhcg);
                /// 融资记录
                var rzjl = ptgl[2].querySelector("div.r").textContent.trim();
                arr.push(rzjl);
                // 监管协会
                var jgxh = ptgl[3].querySelector("div.r").textContent.trim();
                arr.push(jgxh);
                // ICP号
                var icp = ptgl[4].querySelector("div.r").textContent.trim();
                arr.push(icp);
                // 保障模式
                var bzms = ptgl[8].querySelector("div.r").textContent.trim();
                arr.push(bzms);
                // 风险准备金存管
                var fx = ptgl[9].querySelector("div.r").textContent.trim();
                arr.push(fx);
                // 平台背景（银行系 上市系等）
                var ptbj = dom.window.document.querySelector("div.header-da-rt").querySelector("div.bq-box").textContent.trim();
                arr.push(ptbj);
            }
            // console.log('===========' + platName + '==========投资数据====================='+arr.length);
            var tzsj = dom.window.document.querySelector("div.header-da-rb").querySelectorAll("dd");
            //平均参考收益
            arr.push(tzsj[0].querySelector("em").textContent);
            // 成交量
            arr.push(tzsj[2].querySelector("em").textContent);
            // 投资人数
            arr.push(tzsj[3].querySelector("em").textContent);
            // 借款人数
            arr.push(tzsj[4].querySelector("em").textContent);
            // 日资金净流入
            arr.push(tzsj[5].querySelector("em").textContent);
            // 日待还余额
            arr.push(tzsj[6].querySelector("em").textContent);
            //console.log('===========' +platName + '==========业务类型========div.chartBox_l=======tspan======'+arr.length);

            arr.push("");

            //console.log('===========' + platName + '==========高管信息========url.gglist   a span|p============='+arr.length);
            var ggxx = dom.window.document.querySelectorAll("ul.gglist a");
            var ggxxt="";
            for (var m = 0; m < ggxx.length; m++) {
                ggxxt+=ggxx[m].querySelector("span").textContent + ":" + ggxx[m].querySelector("p").textContent+"|";
            }
            arr.push(ggxxt);
            //console.log('==========='+platName+'==========联系方式========div.da-lxfs dd div[0]-em|div[1]============='+arr.length);
            var lxfs = dom.window.document.querySelectorAll("div.da-lxfs dd");
            if(lxfs.length>0){
                var isqq = lxfs[2].querySelector("em").textContent.indexOf('QQ');
                //服务电话
                arr.push(lxfs[0].querySelector("div.r").textContent.trim());
                //座机电话
                if(isqq>0){
                    arr.push(lxfs[5].querySelector("div.r").textContent.trim());
                }else{
                    arr.push(lxfs[4].querySelector("div.r").textContent.trim());
                }
                // 服务邮箱
                arr.push(lxfs[1].querySelector("div.r").textContent.trim());
                // 办公地址
                if(isqq>0) {
                    arr.push(lxfs[3].querySelector("div.r").textContent.trim());
                }else{
                    arr.push(lxfs[2].querySelector("div.r").textContent.trim());
                }
            }else {
                arr.push("");
                arr.push("");
                arr.push("");
                arr.push("");
            }
           var gsjj = dom.window.document.querySelector("div.cen-zk").textContent.trim();
            arr.push(gsjj);
            wdzjData.push(arr);
            resolve("ok");
        })


        })

    }
    var end = new Date().getTime();
    console.log("抓取共"+wdzjData.length+"条数据，花费："+(end-start)/1000+"秒");
    var buffer = xlsx.build([
        {
            name:'sheet1',
            data:wdzjData
        }
    ]);
    fs.writeFileSync('wdzj-161-188-'+(new Date()).getTime()+'.xlsx',buffer,{'flag':'w'});
   console.log("end spider:"+new Date().getTime());
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
