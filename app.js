const express = require('express');
const cookie_parser = require('cookie-parser');//NOTE - COOKIE
const db = require('./config/mongoose-connection');//NOTE - DATABASE PATH
const path = require('path');//NOTE - PATH
const expressSession = require('express-session');//FIXME - i cant do it
const flash=require('connect-flash');//FIXME - i cant do it


require('dotenv').config();


//NOTE - ROUTES
const ownerRouter = require("./routes/ownerRouter");
const productRouter = require("./routes/productRouter");
const userRouter = require("./routes/userRouter");
const indexRouter = require("./routes/indexRouter");


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookie_parser());

app.use(express.static(path.join(__dirname, 'public')));
app.set("view engine", "ejs");

app.use("/owners", ownerRouter);
app.use("/users", userRouter);
app.use("/products", productRouter)
app.use("/index", indexRouter);

app.listen(3000, () => {
});