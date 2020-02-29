const express = require('express');

const Test = require('../models/test');
const TestQuestion = require('../models/testQuestion');
const AnsweredTest = require('../models/answeredTest');

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
        const q = new TestQuestion({
            title: question.questionTitle,
            points: question.points,
            options: [...question.options]
        });
        test.questions.push(q);
        q.save();
    });
    test.save().then(() => {
        res.status(200).json({
            message: 'Test added successfully!'
        })
    });
});


router.get("", (req, res, next) => {
    Test.find().then(fetchedTests => {
        res.status(200).json({
            message: 'Tests fetched successfully',
            tests: fetchedTests
        });
    });
});


router.post("/questions", (req, res, next) => {
    TestQuestion.findOne({ _id: req.body.id }).then(fetchedQuestion => {
        res.status(200).json(fetchedQuestion);
    });
});


router.post("/answers", (req, res, next) => {
    const answeredTest = new AnsweredTest(req.body);
    answeredTest.save().then(response => {
        res.status(200).json({
            answerId: response._id,
            message: 'Answer added successfully'
        })
    })
});


router.get("/answers/:id", (req, res, next) => {
    AnsweredTest.findById({_id: req.params.id})
        .then(response => {
            console.log('Fetched test answer')
            console.log(response);
            res.status(200).json({
                answer: response,
                message: 'Answer fetched'
            })
        })
        .catch(err => console.log(err))
});


module.exports = router;