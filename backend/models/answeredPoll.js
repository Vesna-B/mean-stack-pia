const mongoose = require('mongoose');

const answeredPollSchema = mongoose.Schema({
    pollId: { type: mongoose.Schema.Types.ObjectId, ref: 'Poll' },
    user: { type: String, required: true },
    answers: { type: Array }
});


module.exports = mongoose.model('AnsweredPoll', answeredPollSchema);