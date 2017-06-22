var xlsx = require('node-xlsx');
var fs = require('fs');
console.log("test Excel");

function writeXls(datas) {
    var buffer = xlsx.build({worksheets: [
        {"name": "Group", "data": datas}
    ]});
    fs.writeFileSync("Group.csv", buffer, 'binary');
}
function parseXls() {
    var obj = xlsx.parse('myFile.xlsx');
    console.log(obj);
}
var data=[];
var arr=[];
arr.push("name");
arr.push("age");
data.push(arr);
var arr1=[];
arr1.push("hello");
arr1.push(15);
data.push(arr1);
var buffer = xlsx.build([
    {
        name:'sheet1',
        data:data
    }
]);
fs.writeFileSync('test1.xlsx',buffer,{'flag':'w'});