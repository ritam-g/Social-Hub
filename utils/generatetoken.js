const jwt=require('jsonwebtoken');
process.env.JWT_TOKEN="BHAGE SALA";
let generateToken=(usser)=>{
    return jwt.sign({email:usser.email,id:usser._id},process.env.JWT_TOKEN);                
}

module.exports.generateToken=generateToken;