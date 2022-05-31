const fs=require('fs');
if(!fs.existsSync('./new')){
    fs.mkdir('./new',err=>{
        if(err)throw err;
        console.log("The directory has been created");
    })
}else{
    console.log("The directory already exists")
}