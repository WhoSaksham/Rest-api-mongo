const mongoose = require('mongoose');
const mongoURI = 'mongodb://localhost/ContactBook';

// Connection to MongoDB
const connToMongo = () => {
    try {
        mongoose.connect(mongoURI);
        console.log('Connection successful to DB!')
    }
    catch (err) {
        console.log(err.message)
    }
};

module.exports = connToMongo