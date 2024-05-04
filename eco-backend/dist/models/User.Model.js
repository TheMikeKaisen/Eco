import mongoose, { Schema } from "mongoose";
import validator from 'validator';
const UserSchema = new Schema({
    _id: {
        type: String,
        unique: [true, 'id already exists'],
        required: [true, "Id not provided"]
    },
    photo: {
        type: String,
        required: [true, "Photo not provided"]
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: 'user',
    },
    name: {
        type: String,
        required: [true, "Name not provided"]
    },
    email: {
        type: String,
        unique: [true, 'This email already exists'],
        required: [true, "Name not provided"],
        validate: validator.default.isEmail
    },
    gender: {
        type: String,
        enum: ["male", "female"],
        required: [true, 'Gender not provided']
    },
    dob: {
        type: Date,
        required: [true, 'Date of birth not provided']
    }
}, {
    timestamps: true
});
// calculating the age of user
UserSchema.virtual("age").get(function () {
    const today = new Date();
    const dob = this.dob;
    let age = today.getFullYear() - dob.getFullYear();
    // if the birth date has'nt reached yet, decrease the age by 1
    if ((today.getMonth() < dob.getMonth()) ||
        ((today.getMonth() == dob.getMonth()) && today.getDate() < dob.getDate())) {
        age--;
    }
    return age;
});
export const User = mongoose.model("User", UserSchema);
