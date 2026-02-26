<<<<<<< HEAD
const express=require('express');
const app=express();
const userModel=require('./models/user');
const postModel=require("./models/post");
app.set('view engine','ejs');
app.use(express.urlencoded({extended:true}));const cookieParser=require('cookie-parser');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
// const { default: mongoose } = require('mongoose');
const user = require('./models/user');
const multerconfig=require('./config/multerconfig');
const crypto=require('crypto');
const { log } = require('console');
const path=require('path');
const upload = require('./config/multerconfig');
app.use(cookieParser());
app.use(express.json());
app.use(express.static(path.join(__dirname,'public')));


app.get('/',(req,res)=>
{
    res.render('index');
});
app.get('/profile/uplode',(req,res)=>
{
    res.render('profileuplode');
});
app.post('/upload',isLoggedIN,multerconfig.single("image"),async(req,res)=>
    {
        //NOTE - IN THIS ROUTE WE ARE UPLODING THE IMAGE IN THE PROFILE PIC
        //NOTE - we are CHNAGEING THE PROFILE PIC IN THE DB
        //NOTE - WE ARE UPLODING THE IMAGE IN THE PUBLIC FOLDER


        let user=await userModel.findOne({email:req.user.email})
        user.profilepic=req.file.filename;
        // console.log('req.file :>> ', req.file);
        
        await user.save();
        res.redirect("/profile");
    });
          

    
app.get('/login',(req,res)=>
{
    res.render('login');
});
app.get('/profile',isLoggedIN,async(req,res)=>
{
    
//   console.log('req.user :>> ', req.user);//ITS COMING FROM THE PRTECTED MIDDLE WARE  comingreq.user :>>  {
//   email: 'ritammaty@gmail.com',
//   userid: '67b476f4e09eddd74ac28f2e',
//   iat: 1739881468
// }
   let user=await userModel.findOne({email:req.user.email}).populate("posts");//FOR SENDING POST ONLY WITH ID SO WE DONE POPULATE FUNCATION
//    console.log(user.posts) IF RUN THIS WE CAN SEE ALL POST ARE COMING IN ID FORMAT SO FOR SENDING IN A POST FORMAT WE HAVE TO USE POPULATE
   res.render("profile",{user});
    
});
app.post('/post',isLoggedIN,async(req,res)=>
    {
        
        let{content}=req.body;
       let user=await userModel.findOne({email:req.user.email})
       let post=await postModel.create({
        user:user._id,
        content,
       })
       user.posts.push(post._id);
       await user.save();
       res.redirect("/profile");
        
    });
app.get('/likes/:id',isLoggedIN,async(req,res)=>
        {
    
           let post=await postModel.findOne({_id:req.params.id}).populate("user");//we are mathci the id of post with the id of the post in the db
           if(post.Likes.indexOf(req.user.userid)===-1) 
           {
            post.Likes.push(req.user.userid);//pushing the user id in the likes array
           }
           else
           {
            post.Likes.splice(post.Likes.indexOf(req.user.userid),1);
           }
            await post.save();//saving the post
            res.redirect("/profile")
           
        });
app.get('/edit/:id',isLoggedIN,async(req,res)=>{
    let post=await postModel.findOne({_id:req.params.id}).populate("user");
    res.render("edit",{post});
})
app.post('/update/:id',isLoggedIN,async(req,res)=>{
    await postModel.findOneAndUpdate({_id:req.params.id},{$set:{content:req.body.content}});
    res.redirect("/profile");
})
app.get('/logout',(req,res)=>
{
        //FOR DOING LOGOUT WE HAVE TO DO REMOVE THE COOKIE
        res.cookie("token","");
        res.redirect("/login");
});
                
app.post('/regester',async(req,res)=>{
    //WE ARE CHACKING THE USER GIVING EMAIL WHICH ARE ALREADY REGISTER
     let{email,age,password,username,name}=req.body;
     let user=await userModel.findOne({email})//CHACKING THE SAME USER IN OUR DB OR NOT
     if(user)return res.status(500).send("user alredy registerd");//IF THE EMAIL FOUND IT WILL SHOW 500
    //BCRYPT
    bcrypt.genSalt(10, (err, salt)=> {
        // console.log('salt :>> ', salt);
        bcrypt.hash(password, salt, async (err, hash)=> {//WITH THIS BCRYPT WE ARE ENCRYPTING THE PASSWORD
            // Store hash in your password DB.
            let user=await userModel.create({
                email,
                age,
                password:hash,//THAT ENCRYPTING PASSWORD IS GOINF TO DB NOT THE ACTUALL PASSWORD IS GONE
                username,
                name
            })
            //NOW FOR DOING COOKIE SET IN BROWSER FOR COMMUNICAITON BETWWEN CLIENT TO SERVER WE SUE COOKIE-PARSER
            let token = jwt.sign({ email: email,userid:user._id }, 'shhhhh');//WE ARE DOING ENCRYPTED EMAIL AND USER ID 
            res.cookie("token",token);//TOKEN SEND TO CLIENT
            res.send("registered");

        });
    });
})

app.post('/login',async(req,res)=>{
    //IN THIS ROUTS ONLY PASSWORD AND EMAIL WILL BE CHECK
     let{email,password}=req.body;
     let user=await userModel.findOne({email})//GOT THE USER
     if(!user)return res.status(500).send("SOMETHING WENT WRONG");//IF THE EMAIL IS NOT FOUND WE WILL SAY SOMETHING IS WRONG
   bcrypt.compare(password,user.password,(err,result)=>{//now WE HAVE TO DCRYPT THE ENCRYPTION OF THE PASSWORD FROM DB
    if(result){ //resuLT WILL TRUE WEHEN password,user.password BOTH WILL MARGE AND GIVE THE WRITE DECRYPTED FROMAT
        let token = jwt.sign({ email: email,userid:user._id }, 'shhhhh');//IF USER IS RIGHT THEN SET COOKIE ENCRYPTION WITH KEMAIL BECAUSE WE DECRYPT COOKIE THE EMAIL
        res.cookie("token",token);
        res.status(200).redirect("profile");
        
    }
    else res.redirect("/login");
   })
})
//NOW WE NEED MIDDELWARE FOR PROTECTED LOGIN
function isLoggedIN(req, res, next) {
    //HERE WE ARE CHACKING IF THE COOKIES IS EMATY WE WILL NOT ALLOW TO ENTER IN PROFILE PAE
    if (!req.cookies.token || req.cookies.token === "") {
        // Send response with status and message for the popup
        res.status(401).render('popup', {
            message: "You are logged out. Please login first!",
            redirectUrl: "/login"
        });
        return;
    }
    try {
        //VERIFYING THE THE COOKIES WITH THE SECREATE KEY
        let data = jwt.verify(req.cookies.token, "shhhhh"); //verifying the cookie with securete key
        req.user = data; //transferring all data to req.user means where we call this isLoogedIn funcaiton
        next();
    } catch (error) {
        res.status(401).render('popup', {
            message: "Session expired. Please login again!",
            redirectUrl: "/login"
        });
    }
}

app.listen(3000,()=>console.log('Server is running at 3000'));
=======
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
>>>>>>> main
