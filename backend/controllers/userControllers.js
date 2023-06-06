const asyncHandler = require('../middleware/asyncHandler');
const User = require('../models/userModel');

//auth user and get token
//POST /api/users/login
exports.authUser = asyncHandler(async (req, res)=> {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if (user && (await user.checkPassword(password))){
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
    res.send('register user');
});

//Logout user / clear cookie
//POST  api/users/logout
exports.logoutUser = asyncHandler(async (req, res)=> {
    res.send('logout user');
});

//get user profile
// GET api/users/profile
exports.getUserProfile = asyncHandler(async (req, res)=> {
    res.send('get user profile');
});

//update user profile
// PUT api/users/profile
exports.updateUserProfile = asyncHandler(async (req, res)=> {
    res.send('update user profile');
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