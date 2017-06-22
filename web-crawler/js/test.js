/**
 * Created by taomili on 2017/6/13.
 */

/* http://www.wdzj.com/dangan/
  http://www.wdzj.com/front_select-plat?currPage=188
 http://www.wdzj.com/dangan/xrcf/


   platName    platNamePin
 *
 * http://www.wdzj.com/dangan/${platNamePin}
 *
 *平台名称
 * 平台基本信息 企业名称	注册资金	上线时间	注册地址（注册省份）	网站备案域名
 * 平台实力     平台特征（银行存管 获ICP许可证 接受过风投 加入协会 加入第三方征信 网贷之家考察 等）	平台背景（银行系 上市系等）	保障模式
 * 投资数据（近30天数据）	平均参考收益	成交量	投资人数	借款人数	日资金净流入	日待还余额
 * 业务类型（消费金融 供应链金融等）
  * 高管信息  姓名	职务	服务电话	座机电话	服务邮箱	办公地址
 * */
var request = require('request');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
var options = {
    referrer: "http://www.wdzj.com/dangan/",
    userAgent: "Mellblomenator/9000",
    includeNodeLocations: true
};
JSDOM.fromURL("http://www.wdzj.com/dangan/rrd", options).then(dom =>{
  console.log(dom.window.document.querySelector("div.cen-zk").textContent.trim().r("	",""));
})
function sleep(time){
    return new Promise(function(resolve,reject){
        setTimeout(function(){
            resolve('ok');
        },time);
    })
}
async function test(){
for (var i=0;i<10;i++){
    if(i%2==0){
        await sleep(2000);
    }
    console.log(new Date().getTime());


}
}
test();

