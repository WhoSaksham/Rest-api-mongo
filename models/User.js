const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
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
        default: 'General'
    }
});

module.exports = mongoose.model('user', UserSchema)