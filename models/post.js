const mongoose=require('mongoose');

const postSchema=mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    Date:{
        type:Date,
        default:Date.now
    },
    content:{
        type:String
        },
    Likes:[{
        type:mongoose.Schema.Types.ObjectId,
        
    }]
});
module.exports=mongoose.model('post',postSchema);