const fsPromise=require('fs').promises;
const path=require('path');
// fs.readFile(path.join(__dirname,'files','starter.txt'),'utf-8',(err,data)=>{
// if(err){
//     throw err;
// }else{
//     console.log(data)
// }
// })
// console.log("Hello.......")
// fs.writeFile(path.join(__dirname,'files','reply.txt'),"We are happy to work with you!",(err)=>{
//     if(err) throw err;
//     console.log("Write file complete");
//     fs.appendFile(path.join(__dirname,'files','reply.txt'),"\n\n Yes BOSS!",(err)=>{
//         if(err) throw err;
//         console.log("File appending complete");
//         fs.rename(path.join(__dirname,'files','reply.txt'),path.join(__dirname,'files','replyText.txt'),(err)=>{
//             if(err) throw err;
//             console.log("Rename file completed");
//         })
//     })
// })

// process.on('uncaughtException',(err)=>{
//     console.log(`There was an uncaughtError: ${err}`)
//     process.exit(1);
// })
//USING ASYNCHRONOUS FUNCTIONS
const fileOperations=async ()=>{
     try{
        const data=await fsPromise.readFile(path.join(__dirname,'files','starter.txt'),'utf-8');
        console.log(data);
        await fsPromise.writeFile(path.join(__dirname,'files','replyPromise.txt'),data)
        await fsPromise.appendFile(path.join(__dirname,'files','replyPromise.txt'),'\n\n Nice to meet you!')
        await fsPromise.rename(path.join(__dirname,'files','replyPromise.txt'),path.join(__dirname,'files','replySync.txt'));
        const newData=await fsPromise.readFile(path.join(__dirname,'files','replySync.txt'),'utf-8');
        console.log(newData);

     }catch(err){
        console.error(err);
     }
}
fileOperations();