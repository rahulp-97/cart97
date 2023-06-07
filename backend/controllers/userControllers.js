const asyncHandler = require('../middleware/asyncHandler');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const {generateToken} = require('../utils/generateToken');

//auth user and get token
//POST /api/users/login
exports.authUser = asyncHandler(async (req, res)=> {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if (user && (await user.matchPassword(password))){
        generateToken(res, user._id);
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        });
    } else {
        res.status(401);
        throw new Error('invalid email or password');
    }
});

//register user
//POST api/users
exports.registerUser = asyncHandler(async (req, res)=> {
    const {name, email, password} = req.body;
    const userExists = await User.findOne({email});
    if(userExists){
        res.status(400);
        throw new Error('User registered already. Please login');
    }
    else{
        const user = await User.create({name, email, password});
        if(user){
            generateToken(res, user._id);
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
            });
        } else {
            res.status(400);
            throw new Error('invalid user data');
        }
    }
});

//Logout user / clear cookie
//POST  api/users/logout
exports.logoutUser = asyncHandler(async (req, res)=> {
    res.cookie('jwt', '', {httpOnly: true, expires: new Date(0)});

    res.status(200).json({message: 'logged out successfully'});
});

//get user profile
// GET api/users/profile
exports.getUserProfile = asyncHandler(async (req, res)=> {
    const user = await User.findById(req.user._id);
    if(user){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(404);
        throw new Error('user not found');
    }
});

//update user profile
// PUT api/users/profile
exports.updateUserProfile = asyncHandler(async (req, res)=> {
    const user = await User.findById(req.user._id);
    if(user){
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if(req.body.password){
            user.password = req.body.password;
        }
        const updatedUser = await user.save();
        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        });
    } else {
        res.status(404);
        throw new Error('user not found');
    }
});

//get users
//GET api/users
// access- private/Admin
exports.getUsers = asyncHandler(async(req, res)=> {
    res.send('get users');
});

//get user by id
//GET api/users/:id
// access- private/Admin
exports.getUserById = asyncHandler(async(req, res)=> {
    res.send('get user by id');
});

//update user
//PUT api/users/:id
// access- private/Admin
exports.updateUser = asyncHandler(async(req, res)=> {
    res.send('update user');
});

//delete user
//DELETE api/users/:id
// access- private/admin
exports.deleteUser = asyncHandler(async(req, res)=>{
    res.send('delete user');
});