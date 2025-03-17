// const express = require('express');
const userModel=require('../models/user_model');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const cookie_parser=require('cookie-parser');
const {generateToken}=require("../utils/generatetoken");


module.exports.registeruser= async (req, res) => {
    try {
        let {fullname,email,password}=req.body;
        let user=await userModel.findOne({email:email});
        if(user){
            res.status(401).send("user already exists,please login");
    
            return;
        }
        else{
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(password, salt,async function(err, hash) {
                if (err) {
                    console.log(err.message);
                    
                } else {
                    let createduser= await userModel.create({
                        fullname,
                        email,
                        password:hash
                    });
                    let token=generateToken(createduser);
                    // res.send("comrex user registered");
                    res.cookie("token",token)//NOTE - ITS SENDING THE TOKEN TO THE WEBSITE OF THE CLIENT
                    res.send("user created");
                    
                }
                
            });
        });
        }
    
    } catch (error) {
        console.log(error.message);
        
    }
    
}
module.exports.loginuser=async (req,res)=>{
    let {email,password}=req.body;
    let user= await userModel.findOne({email:email});
    if(!user) res.send("incorrenct email and password");
    bcrypt.compare(password, user.password, function(err, result) {
        if(err) res.send(err.message);
        if(result){
            //NOTE - result wil givd you true
            //TODO - we have TO RENDER THE PROFILE EJS PAGE
            let token=generateToken(user);
            res.cookie("token",token);
            res.send("your succesfully looged in");
        }
        else{
            res.send("invalid email and password");
        }
    });
}