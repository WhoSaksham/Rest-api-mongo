const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "#GoodGoingSaksham" // Needs to be kept in .env

// The following endpoint is used for creating a new user with jwt for authentication

// Route:1 -  Create a new user @ POST: /api/auth/createuser -No authentication required
router.post('/createuser', [
    // Validations to create a new user
    body('name', 'Name must be atleast 5 characters').isLength({ min: 5 }),
    body('number', 'Number must be of 10 Digits').isLength(10)
], async (req, res) => {

    // If errors from validation, throw bad request with errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    try {
        // Check if the user already exits with same number
        let user = await User.findOne({ number: req.body.number });
        if (user) {
            return res.status(400).json({ error: "Sorry a user with this number already exists" });
        }

        // Create a new user
        user = await User.create(req.body);

        const data = {
            user: {
                id: user.id
            }
        }
        // generating auth-token for authentication of user
        const authToken = jwt.sign(data, JWT_SECRET)
        res.json({ authToken, user })
    }
    catch (err) {
        console.error(err.message)
        res.status(500).send('Internal Server Error')
    }
});


module.exports = router