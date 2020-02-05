const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const User = require('./models/user');
const Poll = require('./models/poll');

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
    user.save().then(createdUser => {
        res.status(200).json({
            message: 'User added successfully',
            user: createdUser.username
        });
    });   
});


app.post("/login", (req, res, next) => {
    User.findOne({ username: req.body.username })
        .then(user => {
            if (!user) {
                return res.status(400).json({
                    message: "Korisnik nije pronađen"
                });
            }
            if (user.password != req.body.password) {
                return res.status(401).json({
                    message: "Pogrešna lozinka"
                });
            }
            if (!user.approved) {
                return res.status(403).json({
                    message: "Vaš zahtev za registraciju još uvek nije prihvaćen"
                });
            }
            return res.status(200).json({
                username: user.username,
                type: user.userType,
                approved: user.approved,
                message: ''
            });
        });  
});



app.post('/polls', (req, res, next) => {
    console.log('Received from frontend');
    console.log(req.body);

    const poll = new Poll({
        name: req.body.name,
        info: req.body.info,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        questions: [...{
            title: req.body.questions.questionTitle,
            type: req.body.questions.questionType,
            options: [...{
                optTitle: req.body.questions.options
            }]
        }]
    });

    console.log('Model for base');
    console.log(poll);
    poll.save().then(() => {
        res.status(200).json({
            message: 'Poll added successfully',
            //poll: createdPoll.name
        }).then().catch(err => console.log(err));
    });
});


// app.get('/polls', (req, res, next) => {
//     Poll.find().then(documents => {
//         res.status(200).json({
//             message: 'Fetched data',
//             polls: documents
//         });
//     });
// });









module.exports = app;