const express = require('express');

const Poll = require('../models/poll');
const PollQuestion = require('../models/pollQuestion');

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
        //console.log('Question');
        //console.log(q);
        q.save();
    });

    //console.log('Entire poll')
    //console.log(poll);
    poll.save().then(() => {
        console.log('Poll added successfully')
        res.status(200).json({
            message: 'Poll added successfully!'
        })
    });
});



router.get("", (req, res, next) => {
    Poll.find().then(fetchedPolls => {
        //console.log('Fetched polls');
        //console.log(fetchedPolls);
        res.status(200).json({
            message: 'Polls fetched successfully',
            polls: fetchedPolls
        });
    });
});


router.post("/questions", (req, res, next) => {
    PollQuestion.findOne({ _id: req.body.id }).then(fetchedQuestion => {
        //console.log(fetchedQuestion);
        //console.log(fetchedQuestion.title);
        res.status(200).json({
            questionTitle: fetchedQuestion.title
        });
    });
});



module.exports = router;