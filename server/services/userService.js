const bcrypt = require('bcrypt');
const jwt = require('../lib/jwt');
const User = require('../models/User');
const { SECRET } = require('../constants');
const { validateUserData } = require('../utils/validateUserData');

exports.register = async (userData) => {
    const user = await User.findOne({ email: userData.email });

    if (user) {
        throw new Error('Username already exists!');
    }

    if (userData.password !== userData.repeatPassword) {
        throw new Error('Password missmatch!');
    }

    return User.create(userData);
}

exports.login = async (email, password) => {
    const user = await User.findOne({ email });

    if(!user) {
        throw new Error('Cannot find email or password!');
    }

    const isValid = await bcrypt.compare(password, user.password);

    if(!isValid) {
        throw new Error('Cannot find email or password!');
    }

    validateUserData(email, password);
    
    const payload = {
        _id: user._id,
        email: user.email,
    }

    const token = await jwt.sign(payload, SECRET, {expiresIn: '2d'});

    return { user: payload, token };
}