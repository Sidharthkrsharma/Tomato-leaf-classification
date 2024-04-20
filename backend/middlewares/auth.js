const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');

const auth = (req, res, next) => {
    const token = req.cookies.token || Authorization?.split(" ")[1];
    console.log('token:', token);

    if (!token) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            success: false,
            message: 'Authorization token is missing'
        });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decodedToken.userId;
        next();
    } catch (error) {
        // console.error('JWT verification error:', error);
        return res.status(StatusCodes.UNAUTHORIZED).json({
            success: false,
            message: 'Unauthorized access'
        });
    }
};

module.exports = { auth };
