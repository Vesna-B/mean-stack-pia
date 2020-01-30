const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    placeOfBirth: { type: String, required: true },
    identNum: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    userType: { type: String, required: true },
    approved: { type: Boolean, required: true}      //default: false; true when admin approve
});

module.exports = mongoose.model('User', userSchema);

