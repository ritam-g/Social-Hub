const express=require('express');
const cookie_parser=require('cookie-parser');//NOTE - COOKIE
const db=require('./config/mongoose-connection');//NOTE - DATABASE PATH
const path=require('path');//NOTE - PATH

//NOTE - ROUTES
const ownerRouter=require("./routes/ownerRouter");
const productRouter=require("./routes/productRouter");
const userRouter=require("./routes/userRouter");
const indexRouter=require("./routes/indexRouter");
require('dotenv').config();

const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookie_parser());
app.use(express.static(path.join(__dirname,'public')));
app.set("view engine","ejs");

app.use("/owners",ownerRouter);
app.use("/users",userRouter);
app.use("/products",productRouter)
app.use("/",indexRouter);

app.listen(3000,()=>{
});