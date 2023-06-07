const jwt = require('jsonwebtoken');

exports.generateToken = (res, userId) => {
    //sign - Synchronously sign the given payload into a JSON Web Token string payload.
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn:'365d',
    });

    //set jwt http cookie
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 30*24*60*60*1000    ////milisecond - 365 days.
    });
};