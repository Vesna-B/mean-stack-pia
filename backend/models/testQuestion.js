const mongoose = require('mongoose');

const testQuestionSchema = mongoose.Schema({
    title: { type: String, required: true },
    points: { type: Number, required: true },
    options: { type: Array }
});


module.exports = mongoose.model('TestQuestion', testQuestionSchema);