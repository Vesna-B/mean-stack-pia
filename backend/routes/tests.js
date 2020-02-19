const express = require('express');

const Test = require('../models/test');

const Question = require('../models/question');

const router = express.Router();


router.post("", (req, res, next) => {
    const test = new Test({ 
        author: req.body.author,
        name: req.body.name,
        info: req.body.info,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        duration: req.body.duration,
        //questions: //add one by one
    })

    req.body.questions.forEach(question => {
        const q = new Question({
            title: question.questionTitle,
            answerType: question.answerType,
            options: [...question.options]
        });
        test.questions.push(q);
        console.log('Question');
        console.log(q);
        q.save();
    });

    console.log('Entire test')
    console.log(test);
    test.save().then(() => {
        res.status(200).json({
            message: 'Test added successfully!'
        })
    });

});


router.get("", (req, res, next) => {
    // Test.find().then(fetchedTests => {
    //     console.log('Fetched tests');
    //     console.log(fetchedTests);
    //     //console.log(fetchedTests.test.title)
    //     res.status(200).json({
    //         message: 'Tests fetched successfully',
    //         tests: fetchedTests
    //     });
    // });

    //Test.find().populate('questions').then(result => console.log(result)).catch(error => console.log(error));
});


module.exports = router;