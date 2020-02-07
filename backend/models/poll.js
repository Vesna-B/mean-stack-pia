const mongoose = require('mongoose');

const pollSchema = mongoose.Schema({
    author: { type: String, required: true},
    name: { type: String, required: true },
    info: { type: String, required: true },
    startDate: { type: Date },
    endDate: { type: Date },
    questions: { type: Array }
});


module.exports = mongoose.model('Poll', pollSchema);
