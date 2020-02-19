const mongoose = require('mongoose');

const pollQuestionSchema = mongoose.Schema({
    title: { type: String, required: true }
});

module.exports = mongoose.model('PollQuestion', pollQuestionSchema);