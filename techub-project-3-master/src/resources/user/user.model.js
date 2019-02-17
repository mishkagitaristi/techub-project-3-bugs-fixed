import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema({
    userType: {
        type: String,
        required: true
    },
    firstname: {
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
    companyName: {
        type: String,
    },
    companyId: {
        type: Number,
    },
    password: {
        type: String,
        required: true,
    }
}, { timestamps: true});

UserSchema.pre('save', function(next) {
    if( !this.isModified('password')) {
        return next();
    }
    bcrypt.hash( this.password, 8, (err, hash) => {
        if( err ) {
            return next(err);
        }
        this.password = hash;
        next();
    });
})

export const User = mongoose.model('user', UserSchema);
