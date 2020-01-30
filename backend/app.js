const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const User = require('./models/user')

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
        'GET, POST, PATCH, DELETE, OPTIONS'
    );
    next();
});


app.post("/users", (req, res, next) => {
    const user = new User({
        name: req.body.name,
        surname: req.body.surname,
        username: req.body.username,
        password: req.body.password,
        dateOfBirth: req.body.dateOfBirth,
        placeOfBirth: req.body.placeOfBirth,
        identNum: req.body.identNum,
        phone: req.body.phone,
        email: req.body.email,
        userType: req.body.userType,
        approved: "false"
    });
    console.log('This information is from app.js');
    console.log(user);
    res.status(200).json({
        message: 'User added successfully'
    });
});


// app.use("/users",(req, res, next) => {
//     const users = [
//         {name: 'mika', pass: 'mika123'},
//         {name: 'zika', pass: 'zika123'}
//     ];
//     res.status(200).json({
//         message: 'Users fetched successfully',
//         users: users
//     });
// });




module.exports = app;