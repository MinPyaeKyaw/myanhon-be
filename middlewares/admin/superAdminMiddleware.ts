import { NextFunction, Request, Response } from "express";

import jwtDecode from "jwt-decode";
import { PrismaClient } from "@prisma/client";

import { getJwtTokenFromReq, logError, writeJsonRes } from "../../utils/functions";
import { ROLES } from "../../utils/enums";

const prisma: PrismaClient = new PrismaClient();

export const superAdminMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = getJwtTokenFromReq(req.headers['authorization']);
        if(!token) {
            return writeJsonRes<null>(res, 401, null, "Unthorizied access!");
        }

        const decodedToken:any = jwtDecode(token);

        const superAdmin = await prisma.roles.findFirst({
            where: {
                name: ROLES.SUPER_ADMIN
            }
        })
        
        if(!superAdmin) {
            return writeJsonRes<null>(res, 401, null, "Unthorizied access!");
        }
        
        if(!decodedToken.roleId && decodedToken.roleId !== superAdmin.id) {
            return writeJsonRes<null>(res, 401, null, "Invalid token!");
        }

        next();
    } catch (error) {
        logError(error, "RBAC Middleware");
        return writeJsonRes<null>(res, 500, null, "Internal Server Error!");
    }
}