const jwt = require('jsonwebtoken');
const User = require('../model/user');

const bookauthorise = (roles = []) => async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ status: false, message: 'Access Denied! No token provided' });
        }

        const decoded = jwt.verify(token, process.env.SECRET_TOKEN_KEY);

        const user = await User.findById(decoded._id, '-password -token');
        if (!user) {
            return res.status(404).json({ status: false, message: "User not found" });
        }
        // console.log(user, 'saniluser');

        if (roles.length > 0 && !roles.includes(user.role)) {
            return res.status(403).json({ status: false, message: `Forbidden: This action requires ${roles.join(', ')} Authority` });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ status: false, message: "Invalid or expired token" });
    }
};

module.exports = bookauthorise;