const express=require('express');
const ownerModel=require('../models/owner_model');
const router=express.Router();
if (process.env.NODE_ENV === 'development') {
    router.post("/create",async (req,res)=>{
        
        let owners= await ownerModel.find();//chacking taht there are owner in the database before making the owner
        if(owners.length>0){
            return res.status(503).send("you dont have permison to create a new owner");
        }
        let {Full_name,Email,Password}=req.body;
       let creatOwner= await ownerModel.create({
                    Full_name,
                    Email,
                    Password
        })
        res.send(creatOwner).status(201);
})
}

// console.log(process.env.NODE_ENV);



module.exports=router;