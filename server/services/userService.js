const bcrypt = require('bcrypt');
const jwt = require('../lib/jwt');
const User = require('../models/User');
const { SECRET } = require('../constants');

exports.register = async (userData) => {
    const user = await User.findOne({ email: userData.email });

    if (user) {
        throw new Error('Username already exists!');
    }

    return User.create(userData);
}

exports.login = async (email, password) => {
    const user = await User.findOne({ email });

    if(!user) {
        throw new Error('Cannot find username');
    }

    const isValid = await bcrypt.compare(password, user.password);

    if(!isValid) {
        throw new Error('Cannot find password');
    }
    
    const payload = {
        _id: user._id,
        email: user.email,
    }

    const token = await jwt.sign(payload, SECRET, {expiresIn: '2d'});

    return token;
}