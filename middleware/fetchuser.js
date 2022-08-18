const jwt = require('jsonwebtoken');
const JWT_SECRET = "#GoodGoingSaksham"

const fetchuser = (req, res, next) => {
    try {
        // Get user from jwt token and add id to req object
        const token = req.header('auth-token') // will pass auth-token in header while calling api
        // Check if the user has same token or not
        if (!token) {
            res.status(401).send({ error: 'Plaese authenticate using a valid token' });
        }
        // Verifying token with secret
        const data = jwt.verify(token, JWT_SECRET)
        req.user = data.user
        next();
    }
    catch (error) {
        res.status(500).send('Internal Server Error');
    }
}

module.exports = fetchuser;