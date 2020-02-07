const express = require('express');

const Test = require('../models/test');

const router = express.Router();


router.post("", (req, res, next) => {
    console.log('Received tests from frontend');
    console.log(req.body);

    const test = new Test(req.body);

    console.log('Model of test for base');
    console.log(test);

    test.save().then(() => {
        res.status(200).json({
            message: 'Test added successfully'
        });
    });
});


router.get("", (req, res, next) => {
    Test.find().then(fetchedTests => {
        console.log(fetchedTests);
        res.status(200).json({
            message: 'Test fetched successfully',
            tests: fetchedTests
        });
    });
});


module.exports = router;