const mongoose = require('mongoose');

const ContactSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    number: {
        type: Number,
        unique: true,
        require: true
    },
    group: {
        type: String,
        default: "General"
    }
});

module.exports = mongoose.model('contact', ContactSchema)