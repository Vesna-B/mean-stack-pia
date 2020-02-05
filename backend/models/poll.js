const mongoose = require('mongoose');

const pollSchema = mongoose.Schema({
    name: { type: String, required: true },
    info: { type: String, required: true },
    startDate: { type: Date },
    endDate: { type: Date },
    questions: [{
        title: { type: String },
        type: { type: String },
        options: [{
            optTitle: { type: String}
        }]
    }]
});


module.exports = mongoose.model('Poll', pollSchema);
