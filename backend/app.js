const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const userRoutes = require('./routes/users');
const pollRoutes = require('./routes/polls');

const app = express();      //express app is always express, that is why it is const
                            //we change only middlewares

mongoose.connect("mongodb+srv://MyMDBUser:myuser20@projekat-335ya.mongodb.net/pia?retryWrites=true&w=majority")
    .then(() => {
        console.log('Connected to database');
    })
    .catch(() => {
        console.log('Connection failed');
    });


app.use(bodyParser.json());     //middleware for parsing json data


//resolving CORS problem
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers', 
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    res.setHeader(
        'Access-Control-Allow-Methods', 
        'GET, POST, PUT, PATCH, DELETE, OPTIONS'
    );
    next();
});


app.use("/users", userRoutes);
app.use("/polls", pollRoutes)

module.exports = app;