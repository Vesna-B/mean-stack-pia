const express = require('express');

const Poll = require('../models/poll');
const PollQuestion = require('../models/pollQuestion');
const AnsweredPoll = require('../models/answeredPoll');

const router = express.Router();


router.post("", (req, res, next) => { 
    const poll = new Poll({ 
        author: req.body.author,
        name: req.body.name,
        info: req.body.info,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        //questions: //add one by one
    })

    req.body.questions.forEach(question => {
        const q = new PollQuestion({
            title: question.questionTitle
        });
        poll.questions.push(q);
        q.save();
    });

    poll.save().then(() => {
        console.log('Poll added successfully')
        res.status(200).json({
            message: 'Poll added successfully!'
        })
    });
});



router.get("", (req, res, next) => {
    Poll.find().then(fetchedPolls => {
        res.status(200).json({
            message: 'Polls fetched successfully',
            polls: fetchedPolls
        });
    });
});


router.post("/questions", (req, res, next) => {
    PollQuestion.findOne({ _id: req.body.id }).then(fetchedQuestion => {
        res.status(200).json({
            questionTitle: fetchedQuestion.title
        });
    });
});


router.post("/answers", (req, res, next) => {
    const answeredPoll = new AnsweredPoll(req.body);
    answeredPoll.save().then(response => {
        res.status(200).json({
            answerId: response._id,
            message: 'Answer added successfully'
        })
    })
});



module.exports = router;