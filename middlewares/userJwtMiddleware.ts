import jwtDecode from "jwt-decode";
import { NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

import { getJwtTokenFromReq, writeJsonRes } from "../utils/functions";

const prisma: PrismaClient = new PrismaClient();

export const verifyUserJwt = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = getJwtTokenFromReq(req.headers['authorization']);
        if(!token) {
            return writeJsonRes<null>(res, 401, null, "Unthorizied access!");
        }

        const decodedToken:any = jwtDecode(token);
        if(!decodedToken.id) {
            return writeJsonRes<null>(res, 401, null, "Invalid token!");
        }
        
        const user = await prisma.users.findFirst({
            where: {
                id: decodedToken.id
            }
        })
        if(!user) {
            return writeJsonRes<null>(res, 401, null, "Invalid token!");
        }

        next();
    } catch (error) {
        console.log('USER JWT VERIFICATION ERROR', error);
        return writeJsonRes<null>(res, 500, null, "Internal Server Error!");
    }
}