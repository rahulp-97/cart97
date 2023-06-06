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
}
const User = mongoose.model("User", userSchema);

module.exports = User;