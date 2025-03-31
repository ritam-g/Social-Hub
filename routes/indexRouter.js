const express=require('express');
const router=express.Router();
const isLoggedIn=require("../middlewares/isloogedin");
const product_model = require('../models/product_model');


// it is nly for testing
//FIXME - it will be replaced

// const products = [
//     {
//       name: 'Product 1',
//       price: 100,
//       bgcolor: 'black',
//       panelcolor: '#ffffff',
//       textcolor: '#000000',
//       image: '' // Add base64 or path to image
//     },
//     {
//       name: 'Product 2',
//       price: 200,
//       bgcolor: 'red',
//       panelcolor: '#ffffff',
//       textcolor: '#111111',
//       image: ''
//     }
//   ];
  //NOTE - untill here

router.get("/",(req,res)=>{
    res.render("index",{error:''});
});
    

router.get("/shop",isLoggedIn,async (req,res)=>{
  let products=await product_model.find();
  res.render("shop",{products});
})

module.exports=router;