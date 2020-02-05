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


module.exports = router;
