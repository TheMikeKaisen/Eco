import { NextFunction, Request, Response } from "express";
import { User } from "../models/User.Model.js";

export const newUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.create({})
  } catch (error) {

  }
};
