const jwt=require('jsonwebtoken');
process.env.JWT_TOKEN="BHAGE SALA";
const userModel=require('../models/user_model');
module.exports=async(req,res,next)=>{
    if(!req.cookies.token || req.cookies.token==""){
        res.redirect("/index");
        return;
    }
    try {
        let token=req.cookies.token;
        let decodee=jwt.verify(token,process.env.JWT_TOKEN);
        let user=await userModel.findOne({email:decodee.email}).select("-password");
        req.user=user;
        next();        
    } catch (error) {
        res.status(401).redirect("/users/login")

    }
}