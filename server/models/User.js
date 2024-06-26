const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required!'],
        unique: true,
        validate: {
            validator: function (v) {
                return /[A-Za-z0-9.]{6,}.@gmail.(bg|com)/g.test(v);
            },
            message: props => `${props.value} is invalid. Email must contain latin letters and digits only!`
        },
    },
    username: {
        type: String,
        required: [true, 'Username is required!'],
        unique: true,
        minLength: [3, 'Username should be at least 3 characters long!'],
        maxLength: [30, 'Username should be no longer than 12 characters!'],
        match: [/[a-zA-Z0-9]+/, 'Username must contain latin letters and digits only!'],
    },
    password: {
        type: String,
        required: [true, 'Password is required!'],
        minLength: [4, 'Password should be at least 4 characters long!'],
        validate: {
            validator: function (v) {
                return /[a-zA-Z0-9]+/g.test(v);
            },
            message: props => `${props.value} must contain latin letters and digits only!`
        },
    },
    imageUrl: {
        type: String,
        required: false,
    },
    items: [{
        type: mongoose.Types.ObjectId,
        ref: "Item"
    }]
}, { timestamps: { createdAt: 'created_at' } });

userSchema.virtual('repeatPassword').set(function (value) {
    if (value !== this.password) {
        throw new Error('Password missmatch!');
    }
});

userSchema.pre('save', async function () {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
});

const User = mongoose.model('User', userSchema);

module.exports = User;