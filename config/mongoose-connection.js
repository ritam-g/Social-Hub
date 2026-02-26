process.env.DEBUG = 'development:mongoose';
process.env.NODE_ENV = 'development';
const mongoose = require('mongoose');
const debug = require("debug")("development:mongoose");

// Use environment variables for MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/EcommerceDB';

mongoose
    .connect(MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });

module.exports = mongoose.connection;
//NOTE - mongoose.connection is an object that represents the connection to the database.
//  It is used to perform operations on the database.
//FIXME - ITS ACTUALLY A CONNECTION OBJECT THAT REPRESENTS THE CONNECTION TO THE DATABASE.
//  IT IS USED TO PERFORM OPERATIONS ON THE DATABASE.