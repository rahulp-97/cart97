const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
}, {timestamps: true});

// entered password comparison with the stored password in database.
userSchema.methods.checkPassword = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
};

// pre method does something before executing the given operation, we have given save here.
// so it executes below functionality before saving the user to the DB.
// it will hash the plain password, then it will save user to the DB.
userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})
const User = mongoose.model("User", userSchema);

module.exports = User;