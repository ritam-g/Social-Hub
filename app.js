const express=require('express');
const cookie_parser=require('cookie-parser');
const db=require('./config/moongoose_connection');
const path=require('path');
const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookie_parser());
app.use(express.static(path.join(__dirname,'public')));
app.set('view engine','ejs');
app.get('/',(req,res)=>{
    res.send("helcome to home page");
});
app.listen(3000,()=>{
    console.log("server is running on port 3000");
});