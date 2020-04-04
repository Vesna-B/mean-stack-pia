const mongoose = require('mongoose');

const answeredPollSchema = mongoose.Schema({
    pollId: { type: mongoose.Schema.Types.ObjectId, ref: 'Poll' },
    userFirstName: { type: String },
    userLastName: { type: String },
    userDateOfBirth: { type: Date },
    answers: { type: Array }
});


module.exports = mongoose.model('AnsweredPoll', answeredPollSchema);