const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    placeOfBirth: { type: String, required: true },
    identNum: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    userType: { type: String, required: true },
    approved: { type: String, required: true},      //default: waiting; approved/rejected when admin approve/reject
    answeredPolls: { type: Array },
    answeredTests: { type: Array}
});

userSchema.plugin(uniqueValidator);     //trows error if we try to register user with existing username

module.exports = mongoose.model('User', userSchema);

