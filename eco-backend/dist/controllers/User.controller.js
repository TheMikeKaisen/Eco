import { User } from "../models/User.Model.js";
import { TryCatch } from "../middlewares/error.js";
import ErrorHandler from "../utils/utility-class.js";
export const newUser = TryCatch(async (req, res, next) => {
    const { name, email, photo, gender, _id, dob } = req.body;
    const userExists = await User.findById(_id);
    if (userExists) {
        return res.status(200).json({
            success: true,
            message: `Welcome, ${userExists.name}`
        });
    }
    if (!_id || !name || !email || !email || !gender || !dob) {
        return next(new ErrorHandler("All fields are required!", 400));
    }
    const user = await User.create({
        name,
        email,
        photo,
        gender,
        _id,
        dob: new Date(dob)
    });
    return res.status(200).json({
        message: "signed up successfully ",
        user
    });
});
export const getAllUsers = TryCatch(async (req, res, next) => {
    const users = await User.find({});
    if (!users) {
        return next("Could'nt find users");
    }
    return res.status(200).json({
        success: true,
        users
    });
});
export const getUser = TryCatch(async (req, res, next) => {
    const id = req.params?.id;
    const user = await User.findById(id);
    if (!user) {
        return next(new ErrorHandler("Invalid Id", 400));
    }
    return res.status(200).json({
        success: true,
        user
    });
});
export const deleteUser = TryCatch(async (req, res, next) => {
    const id = req.params?.id;
    const user = await User.findById(id);
    if (!user) {
        return next(new ErrorHandler("User not found", 400));
    }
    await User.findByIdAndDelete(id);
    return res.status(200).json({
        success: true,
        message: "User successfully deleted!"
    });
});
