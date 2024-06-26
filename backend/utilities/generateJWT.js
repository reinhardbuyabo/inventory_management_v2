// Utilities:
const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = id => {
    return jwt.sign(
        { id }, // we're putting the user id as the payload so that when we decode the token, we get the 'id'
        process.env.JWT_SECRET, // we sign the token with the secret that is provided ...
        { expiresIn: '30d' }
    );
}

module.exports = generateToken