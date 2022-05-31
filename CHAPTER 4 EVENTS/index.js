const EventEmitter=require('events');
const emmiter=new EventEmitter();
const {logEvent}=require('./script');
var msg=`Event logged successfully`;
emmiter.on('log',()=>{
    setInterval(()=>{
        logEvent(msg);
     },5000);
})
// emmiter.emit('log');
const http=require('http');
const path = require('path');
const { fstat } = require('fs');
const PORT=process.env.PORT ||3040;
var pathName;
const server=http.createServer((req,res)=>{
    if(req.url==='/'|| req.url==='index.html'){
        res.statusCode=200;
        res.setHeader('Content-Type','text/html');
        pathName=path.join(__pathname,'views','index.html');
        fs.readFile(pathName,'utf-8',(err,data)=>{
            if(err)throw err;
            res.end(data);
        });
    }
})
server.listen(PORT,()=>{
    console.log(`Server runnnig at http://localhost:${PORT}`)
})
process.on('uncaughtException',(err)=>{
    console.log(`There was this error: ${err}`)
    process.exit(1);
})