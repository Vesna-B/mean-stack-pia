const express = require('express');

const User = require('../models/user');

const router = express.Router();


router.post("", (req, res, next) => {
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
        approved: req.body.approved,
        answeredPolls: [],
        answeredTests: []
    });
    console.log('This information is from app.js');
    console.log(user);
    console.log(user.answeredPolls);
    console.log(user.answeredTests);
    user.save().then(createdUser => {
        res.status(200).json({
            message: 'User added successfully',
            user: createdUser.username
        });
    });   
});


router.get("", (req, res, next) => {
    User.find().then(fetchedData => {
        res.status(200).json({
            users: fetchedData
        });
    });
});


router.post("/login", (req, res, next) => {
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


router.delete("/:id", (req, res, next) => {
    User.deleteOne({ _id: req.params.id })
        .then(() => {
            console.log('User is deleted');
            res.status(200).json({
                message: 'User deleted successfully'
            });
        })
        .catch(err => {
            console.log(err);
        });
});


router.put("", (req, res, next) => {
    User.findById(req.body._id)
        .then(fetchedUser => {
            console.log('Before changes');
            console.log(fetchedUser);
            fetchedUser.approved = req.body.approved;
            fetchedUser.save();
            console.log('After changes');
            console.log(fetchedUser);
            res.status(200).json({
                message: 'User updated'
            });
        })
        .catch(err => console.log(err));
});


router.put("/pollanswers", (req, res, next) => {
    User.findOne({ username: req.body.user })
        .then(fetchedUser => {
            fetchedUser.answeredPolls.push({ pollId: req.body.pollId, answerId: req.body.answerId });
            fetchedUser.save();
            res.status(200).json({
                user: fetchedUser,
                message: "Poll_answer_id added to user's answeredPoll array"
            });
        })
        .catch(err => console.log(err));
});




module.exports = router;
