const mongoose=require('mongoose');

mongoose
.connect('mongodb://127.0.0.1:27017/EcommerceDB')
.then(()=>{
    console.log("Connection to database is successful");
})
.catch((err)=>{
    console.log(err);
})
module.exports=mongoose.connection;
//NOTE - mongoose.connection is an object that represents the connection to the database.
//  It is used to perform operations on the database.
//FIXME - ITS ACTUALLY A CONNECTION OBJECT THAT REPRESENTS THE CONNECTION TO THE DATABASE.
//  IT IS USED TO PERFORM OPERATIONS ON THE DATABASE.