const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const userRoutes = require('./routes/users');


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


//------------------------------------ move to routes/polls ---------------

app.post('/polls', (req, res, next) => {
    console.log('Received from frontend');
    console.log(req.body);
    const poll = new Poll(req.body);

    // const poll = new Poll({
    //     name: req.body.name,
    //     info: req.body.info,
    //     startDate: req.body.startDate,
    //     endDate: req.body.endDate,
    //     questions: [...{
    //         title: req.body.questions.questionTitle,
    //         type: req.body.questions.questionType,
    //         options: [...{
    //             optTitle: req.body.questions.options
    //         }]
    //     }]
    // });

    console.log('Model for base');
    console.log(poll);

    poll.save().then(() => {
        res.status(200).json({
            message: 'Poll added successfully',
            //poll: createdPoll.name
        });
    });
});

//------------------------------------------------------------------------------------------



app.use("/users" , userRoutes);

module.exports = app;