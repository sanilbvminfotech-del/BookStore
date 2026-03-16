const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    hobbies: {
        type: [String],
        required: true
    },
    gender: {
        type: String,
        enum: ["male", "female", "other"],
        required: true
    },
    booksID: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book'
    }],
    image: {
        type: String,
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    statusField: {
        type: Boolean,
        default: true
    },
    token: {
        type: String,
        default: null
    },
    verifyToken: {
        type: String,
        default: null
    }
}, { timestamps: true });


userSchema.pre('save', async function () {
    if (!this.isModified('password')) return;
    try {
        const hashPassword = await bcrypt.hash(this.password, 10);
        this.password = hashPassword;
    } catch (error) {
        throw error;
    }
});

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({
        _id: this._id,
        email: this.email,
        role: this.role
    }, process.env.SECRET_TOKEN_KEY, { expiresIn: '120m' });
    return token;
}

const User = mongoose.model('User', userSchema);

module.exports = User;