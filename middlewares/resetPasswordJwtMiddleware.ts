import jwtDecode from "jwt-decode";

import { NextFunction, Request, Response } from "express";
import { writeJsonRes } from "../utils/functions";

export const verifyResetPasswordJwt = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if(!token) {
            return writeJsonRes<null>(res, 401, null, "Unthorizied access!");
        }

        const decodedToken:any = jwtDecode(token);
        if(!decodedToken.resetPasswordToken) {
            return writeJsonRes<null>(res, 401, null, "Invalid token!");
        }

        next();
    } catch (error) {
        console.log('RESET PASSWORD JWT VERIFICATION ERROR', error);
        return writeJsonRes<null>(res, 500, null, "Internal Server Error!");
    }
}