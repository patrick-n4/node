//CREATING SERVER USING CORE MODULES
const http=require('http');
const PORT=3060;
http.createServer((req,res)=>{
    res.writeHead(200,{
        "Content-Type": "text/html"
    })
    res.write("Hello World!");
    res.end()
}).listen(PORT,()=>{
    console.log(`Server running on http://localhost:${PORT}`);
})
