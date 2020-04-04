const mongoose = require('mongoose');

const answeredTestSchema = mongoose.Schema({
    testId: { type: mongoose.Schema.Types.ObjectId, ref: 'Test' },
    userFirstName: { type: String, required: true },
    userLastName: { type: String, required: true },
    userDateOfBirth: { type: Date, required: true },
    score: { type: Number, required: true },
    answers: { type: Array }
});


module.exports = mongoose.model('AnsweredTest', answeredTestSchema);