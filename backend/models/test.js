const mongoose = require('mongoose');

const testSchema = mongoose.Schema({
    author: { type: String, required: true},
    name: { type: String, required: true },
    info: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    duration: { type: Number, required: true },
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TestQuestion' }]
});


module.exports = mongoose.model('Test', testSchema);