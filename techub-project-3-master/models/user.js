const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    mobile: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    userType: {
        type: String,
        required: true,
        enum: ["person", "company"]
    },
    companyName: {
        type: String,
    },
    IC: {
        type: Number,
    }
}, { timestamps: true});


const User = mongoose.model('user', UserSchema);

module.exports = {User}