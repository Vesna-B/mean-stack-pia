const express = require('express');

const Poll = require('../models/poll');

const router = express.Router();


router.post("", (req, res, next) => {
    console.log('Received from frontend');
    console.log(req.body);

    const poll = new Poll(req.body);

    console.log('Model for base');
    console.log(poll);

    poll.save().then(() => {
        res.status(200).json({
            message: 'Poll added successfully'
        });
    });
});


router.get("", (req, res, next) => {
    Poll.find().then(fetchedPolls => {
        console.log(fetchedPolls);
        res.status(200).json({
            message: 'Polls fetched successfully',
            polls: fetchedPolls
        });
    });
});


module.exports = router;