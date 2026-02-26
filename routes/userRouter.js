const express = require('express');
const userModel=require('../models/user_model');
// const bcrypt=require('bcrypt');
// const jwt=require('jsonwebtoken');
// const {generateToken}=require("../utils/generatetoken");
const cookie_parser=require('cookie-parser');

const { registeruser ,loginuser, logout }=require("../controllers/authcontroller");
const isloogedin = require('../middlewares/isloogedin');
// const {loginuser}=require("../controllers/authcontroller")
require('dotenv').config();


const router = express.Router();
router.use(cookie_parser());
router.get("/", (req, res) => {
    res.send("its working from userRoutes");
})

router.post("/register", registeruser);

router.post("/login",loginuser);
router.get("/logout",logout);
router.get("/myaccount",isloogedin, async (req, res) => {
    //TODO - we have TO RENDER THE PROFILE EJS PAGE
    let user= await userModel.findById(req.user._id);
    res.render("myaccount",{user});
})

module.exports = router;