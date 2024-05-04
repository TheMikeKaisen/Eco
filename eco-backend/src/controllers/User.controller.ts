import { NextFunction, Request, Response } from "express";
import { User } from "../models/User.Model.js";
import { NewUserRequestBody } from "../types/types.js";
import { TryCatch } from "../middlewares/error.js";

export const newUser = TryCatch(async (
  req: Request<{}, {}, NewUserRequestBody>, 
  res: Response, 
  next: NextFunction
  ) => {

  throw new Error("lala")
  const {name, email, photo, gender, _id, dob} = req.body
  const user = await User.create({
    name, 
    email, 
    photo, 
    gender, 
    _id,
    dob: new Date(dob)
  })

  return res.status(200).json(user)

}
)