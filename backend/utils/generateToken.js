const jwt = require('jsonwebtoken');

exports.generateToken = (res, userId) => {
    //sign - Synchronously sign the given payload into a JSON Web Token string payload.
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn:'365d',
    });
    //set httpOnly cookie
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
        sameSite: 'strict', // Prevent CSRF attacks
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      });
};