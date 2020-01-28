const express = require("express");

const app = express();      //express app is always express, that is why it is const
                            //we change only middlewares

app.use((req, res, next) => {
    console.log('First middleware');
    next();
});

app.use((req, res, next) => {
    res.send('Hello from express');
});



module.exports = app;