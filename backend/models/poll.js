const mongoose = require('mongoose');

const pollSchema = mongoose.Schema({
    author: { type: String, required: true},
    name: { type: String, required: true },
    info: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    pollType: { type: String, required: true},          //anonymous or personal
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'PollQuestion' }]
});


module.exports = mongoose.model('Poll', pollSchema);
