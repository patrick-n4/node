import express from "express";
import bodyParser from "body-parser";
import router from "./routes/users.js"

const app=express();
const PORT=4040;
app.use(bodyParser.json());
app.use('/users',router)
app.get('/',(req,res)=>{
    res.send("I am working of the REST API'S");
})
app.listen(PORT,()=>{
    console.log(`Server running at http://localhost:${PORT}`);
})