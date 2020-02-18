const mongoose = require('mongoose');

const testSchema = mongoose.Schema({
    author: { type: String, required: true},
    name: { type: String, required: true },
    info: { type: String, required: true },
    startDate: { type: Date },
    endDate: { type: Date },
    duration: { type: Number},
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }]
    // questions: [{
    //     title: { type: String },
    //     type: { type: String },
    //     options: [{
    //         optTitle: { type: String}
    //     }]
    // }]
});


module.exports = mongoose.model('Test', testSchema);