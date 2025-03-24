const express=require('express');
const upload=require('../config/multer-config');
const produtmodel=require('../models/product_model');
const router=express.Router();
router.post("/create",upload.single('image'),async (req,res)=>{
   try {
    const {name,price,discount,bgcolor,panelcolor,textcolor}=req.body;
    let createdproduct=await produtmodel.create({
        image:req.file.buffer,
        name,
        price,
        discount,
        bgcolor,
        panelcolor,
        textcolor
    })
    let succes="product created successfully";
   console.log(succes);
   
    // res.send(createdproduct);
    res.redirect('/owners/admin');
     // res.status(201).send(succes);
   } catch (error) {
    console.log(error.massge);
    res.status(500).send("Internal Server Error");
    
   }

})


module.exports=router;