const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
    title: { type: String, required: true },
    answerType: { type: String, required: true },
    options: { type: Array }
});


module.exports = mongoose.model('Question', questionSchema);