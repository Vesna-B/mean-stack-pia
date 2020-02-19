const mongoose = require('mongoose');

const pollSchema = mongoose.Schema({
    author: { type: String, required: true},
    name: { type: String, required: true },
    info: { type: String, required: true },
    startDate: { type: Date },
    endDate: { type: Date },
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'PollQuestion' }]
});


module.exports = mongoose.model('Poll', pollSchema);
