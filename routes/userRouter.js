const express = require('express');
// const userModel=require('../models/user_model');
// const bcrypt=require('bcrypt');
// const jwt=require('jsonwebtoken');
// const {generateToken}=require("../utils/generatetoken");
const cookie_parser=require('cookie-parser');

const { registeruser ,loginuser, logout }=require("../controllers/authcontroller");
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

module.exports = router;