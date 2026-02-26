const express=require('express');
const router=express.Router();
const isLoggedIn=require("../middlewares/isloogedin");
const product_model = require('../models/product_model');
const user_model = require('../models/user_model');
// const user_model = require('../models/user_model');


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
    res.render("index",{error:'', loggedin: false});
});
    

router.get("/shop",isLoggedIn,async (req,res)=>{
    try {
        let products = await product_model.find();
        res.render("shop", { products, loggedin: true });
    } catch (error) {
        res.status(500).render("error", { error: "Failed to fetch products" });
    }
});
router.get("/cart", isLoggedIn, async (req, res) => {
    try {
        const user = await user_model
            .findOne({ email: req.user.email })
            .populate("cart");
        res.render("cart", { user, loggedin: true });
    } catch (error) {
        res.status(500).render("error", { error: "Failed to fetch cart" });
    }
});
router.get("/addtocart/:id", isLoggedIn, async (req, res) => {
    try {
        const user = await user_model.findOne({ email: req.user.email });
        if (!user) {
            return res.status(404).send("User not found");
        }
        user.cart.push(req.params.id);
        await user.save();
        res.redirect("/index/shop?added=true");
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});


module.exports=router;