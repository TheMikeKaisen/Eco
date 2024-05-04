import { User } from "../models/User.Model.js";
export const newUser = async (req, res, next) => {
    try {
        const user = await User.create({});
    }
    catch (error) {
    }
};
