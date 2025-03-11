const mongoose=require('mongoose');
const userSchema=mongoose.Schema({
    Full_name:{type:String},
    Email:{type:String},
    Password:{type:String},
    cart:[{
        type:Array,
        default:[]
    }],
    orders:[{
        type:Array,
        default:[]
    }],
    contact:{
        type:Number
    },
    picture:{
        type:String
    },
    isAdmin:{
        type:Boolean,
        default:false
    }

})
module.exports=mongoose.model('User',userSchema);