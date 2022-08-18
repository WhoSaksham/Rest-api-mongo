const express = require('express');
const app = express();
const port = 8000;
const connToMongo = require('./db')

// Function call for connecton to mongoDB
connToMongo();

// To use json for api calls
app.use(express.json());

// Available Routes
app.use('/api/auth', require('./routes/auth')) // For creating user and auth-token
app.use('/api/contacts', require('./routes/contacts')) // For performing CRUD of contacts

// Default endpoint for testing
app.get('/', (req, res) => {
    res.send('Hello Saksham')
});

// Listening to server
app.listen(port, () => {
    console.log(`Server running @ http://localhost:${port}`)
});