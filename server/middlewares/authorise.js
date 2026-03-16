const jwt = require('jsonwebtoken');
const User = require('../model/user');

const authorise = async (req, res, next) => {
    const commingToken = req.header('Authorization');

    if (!commingToken) {
        return res.status(401).json({ status: false, message: 'Access denied-token required!' });
    }
    const onlyToken = commingToken.split(' ')[1];

    try {
        const decoded = jwt.verify(onlyToken, process.env.SECRET_TOKEN_KEY);
        // console.log(decoded, 'decoded');

        const getUserDetails = await User.findById(decoded._id, '-password -token');
        req.user = getUserDetails;

        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError' || error.name === 'JsonWebTokenError') {
            console.log(error);
            return res.status(401).json({ status: false, message: 'Access Denied! Token is invalid or expired!' });
        }

        return res.status(500).json({ message: "Internal Server Error during validation" });
    }
};

module.exports = authorise;