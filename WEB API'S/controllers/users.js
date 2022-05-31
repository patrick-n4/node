import {v4 as uuidv4} from "uuid";

let users=[];
export const getUsers=(req,res)=>{
    console.log(users);
    res.send(users);
}
export const createUser=(req,res)=>{
    const user=req.body;
    users.push({...user,id:uuidv4()});
    res.send(`User with name ${user.fname} added to the database successfully`);
}
export const getUser=(req,res)=>{
    const {id}=req.params;
    const foundUser=users.find((user)=>user.id===id);
    res.send(foundUser);
}
export const deleteUser=(req,res)=>{
    const {id}=req.params;
    users=users.filter(user=>user.id!==id);
    res.send(`User with id: ${id} is deleted from the database.`);
}
export const updateUser=(req,res)=>{
    const {id}=req.params;
    const user=users.find((user)=>user.id===id);
    const {fname,lname,age}=req.body;
    if(fname){
        user.fname=fname
    }
    if(lname){
        user.lname=lname
    }
    if(age){
        user.age=age;
    }   
    res.send(`User with id: ${id} is updated successfulyy in the database`); 
}