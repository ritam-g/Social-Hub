const jwt = require('jsonwebtoken');
const userModel = require('../models/user_model');

module.exports = async (req, res, next) => {
    if (!req.cookies.token || req.cookies.token === "") {
        res.redirect("/index");
        return;
    }
    try {
        const token = req.cookies.token;
        const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await userModel.findOne({ email: decoded.email }).select("-password");
        req.user = user;
        next();
    } catch (error) {
        res.status(401).redirect("/users/login");
    }
}