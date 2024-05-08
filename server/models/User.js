const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: { 
        type: String, 
        required: [true, 'Email is required!'], 
        unique: true 
    },
    password: { 
        type: String, 
        required: [true, 'Password is required!']
    },
    created_at: {
        type: String
    }
});

userSchema.virtual('repeatPassword').set(function (value) {
    if(value !== this.password) {
        throw new Error('Password missmatch!');
    }
});

userSchema.pre('save', async function () {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
});

const User = mongoose.model('User', userSchema);

module.exports = User;