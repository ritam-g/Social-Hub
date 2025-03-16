process.env.DEBUG = 'development:mongoose';
process.env.NODE_ENV = 'development';
const mongoose = require('mongoose');
const debug = require("debug")("development:mongoose");
const config=require('config');
debug('Connected to MongoDB');
mongoose
    .connect(`${config.get('MONGODB_URL')}/EcommerceDB`)//NOTE - `${config.get('MONGODB_URL')}/EcommerceDB` is the connection string to the database.
                                                        //we directly connect to the database using the connection string.
    .then(() => {
        debug('Connected to MongoDB');
    })
    .catch((err) => {
        console.log(err);
    })
module.exports = mongoose.connection;
//NOTE - mongoose.connection is an object that represents the connection to the database.
//  It is used to perform operations on the database.
//FIXME - ITS ACTUALLY A CONNECTION OBJECT THAT REPRESENTS THE CONNECTION TO THE DATABASE.
//  IT IS USED TO PERFORM OPERATIONS ON THE DATABASE.