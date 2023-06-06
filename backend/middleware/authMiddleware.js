const jwt = require('jsonwebtoken');
const asyncHandler = require('./asyncHandler');
const User = require('../models/userModel');

exports.protect = asyncHandler(async (req,res,next)=>{
    let token;
    // read the jwt from cookie
    token = req.cookies.jwt;
    if(token){
        try{
            //synchronously verify given token using a secret or a public key to get a decoded token token 
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decoded);
            //select- Specifies which document fields to include or exclude
            // excluding password field
            req.user = await User.findById(decoded.userId).select('-password');
            next();
        } catch(error){
            res.status(401);
            throw new Error('not authorized, token failed');
        }
    } else {
        res.status(401);
        throw new Error('not authorized, no token');
    }
});

exports.admin = (req, res, next) => {
    if(req.user && req.user.isAdmin){
        next();
    } else {
        res.status(401);
        throw new Error('Not authorized as admin');
    }
}