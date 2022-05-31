const fs=require('fs');
const {v4 : uuid}=require('uuid');
const {format}=require('date-fns')
const path=require('path');
let logEvent=(msg)=>{
let date=`${format(new Date(),'yyyyMMdd\tHH:mm:ss')}`;
let logItem=`${date} \t\t${uuid()}\t\t${msg}\n`;
console.log(logItem)
if(!fs.existsSync('./test')){
    fs.mkdir('./test',err=>{
        if(err) throw err;
    })
}
fs.appendFile(path.join(__dirname,'test','test.txt'),`${logItem}`,(err)=>{
    if(err)throw err;
})
}
module.exports={logEvent};