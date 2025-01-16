const jwt = require('jsonwebtoken');
const User = require('./models/User'); // Adjust the path as necessary

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Get token from Authorization header

    if (!token) {
        return res.sendStatus(401); // Unauthorized if no token
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
        if (err) {
            return res.sendStatus(403); // Forbidden if token is invalid
        }

        // Find the user in the database
        req.user = await User.findById(user.id); // Assuming the token contains the user ID
        next(); // Proceed to the next middleware or route handler
    });
};

module.exports = authenticateToken;