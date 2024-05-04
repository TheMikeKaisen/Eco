import { NextFunction, Request, Response } from "express";

export interface NewUserRequestBody
    {
        name: string;
        email: string;
        photo: string;
        gender: string;
        role: string;
        _id: string;
        dob: Date;

    }


export type ControllerType = (req: Request<{}, {}, NewUserRequestBody>, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>