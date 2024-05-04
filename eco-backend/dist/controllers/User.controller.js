import { User } from "../models/User.Model.js";
export const newUser = async (req, res, next) => {
    try {
        const { name, email, photo, gender, role, _id, dob } = req.body;
        const user = await User.create({});
    }
    catch (error) {
    }
};
