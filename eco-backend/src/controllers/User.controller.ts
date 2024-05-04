import { NextFunction, Request, Response } from "express";
import { User } from "../models/User.Model.js";
import { NewUserRequestBody } from "../types/types.js";

export const newUser = async (
    req: Request<{}, {}, NewUserRequestBody>, 
    res: Response, 
    next: NextFunction
    ) => {
  try {
    const {name, email, photo, gender, role, _id, dob} = req.body
    const user = await User.create({})
  } catch (error) {

  }
};
