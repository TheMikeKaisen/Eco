import { User } from "../models/User.Model.js";
import { TryCatch } from "../middlewares/error.js";
export const newUser = TryCatch(async (req, res, next) => {
    throw new Error("lala");
    const { name, email, photo, gender, _id, dob } = req.body;
    const user = await User.create({
        name,
        email,
        photo,
        gender,
        _id,
        dob: new Date(dob)
    });
    return res.status(200).json(user);
});
