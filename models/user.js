const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { Schema, model } = mongoose;

const userSchema = new Schema({
    firstName: {
        type: String,
        lowercase: true,
        trim: true,
        maxlength: 10,
        required: true
    },
    lastName: {
        type: String,
        lowercase: true,
        trim: true,
        maxlength: 15,
        required: true
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid!');
            }
        },
        required: true
    },
    password: {
        type: String,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('password cannot contain "password"');
            }
        }
    },
    role: {
        type: String,
        default: 'student',
        enum: ['student', 'admin', 'staff'],
        required: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
},
    {
        timestamps: true
    }
);

userSchema.methods.toJSON = function () {
    const userObject = this.toObject();

    delete userObject.password;
    delete userObject.tokens;
    delete userObject.createdAt;
    delete userObject.updatedAt;
    delete userObject.__v;

    return userObject;
};

userSchema.methods.generateAuthToken = async function () {
    const user = this;

    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;
};

userSchema.statics.findByCredentials = async (email, password) => {

    const user = await User.findOne({ email });

    if (!user) {
        throw new Error(`The email address or the password that you've entered is invalid!`);
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw Error(`The email address or the password that you've entered is invalid!`);
    }

    return user;
};

userSchema.pre('save', async function (next) {
    const user = this;

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 10);
    }

    next();
});

const User = model('User', userSchema);

module.exports = User;