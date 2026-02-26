const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
    return jwt.sign(
        { email: user.email, id: user._id },
        JWT_SECRET,
        { expiresIn: '24h' }
    );
}

module.exports = { generateToken };