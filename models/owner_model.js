const mongoose=require('mongoose');
const ownerSchema=mongoose.Schema({
    Full_name:{type:String},
    Email:{type:String},
    Password:{type:String},
    products:[{
        type:Array,
        default:[]
    }],
    
    picture:{
        type:String
    },
    gstin:{
        type:String
    }

})
module.exports=mongoose.model('Owner',ownerSchema);