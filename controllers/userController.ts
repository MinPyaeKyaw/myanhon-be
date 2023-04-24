import {Request, Response} from "express";
import { PrismaClient } from '@prisma/client';
import { getJwtToken, writeJsonRes } from "../utils/functions";

const prisma: PrismaClient = new PrismaClient();

export const editUserById = async (req: Request, res: Response) => {
    try {
        const user = await prisma.users.findUnique({
            where: {
                id: req.params.id
            }
        })

        if(!user) {
            return writeJsonRes(res, 404, null, "User not found!");
        }

        const editedUser = await prisma.users.update({
            where: {
                id: req.params.id
            },
            data: {
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone
            }
        });

        const tokenData = {
            id: editedUser.id,
            name: editedUser.name,
            email: editedUser.email,
            phone: editedUser.phone,
            isPaid: editedUser.isPaid,
            startDate: editedUser.startDate,
            expiredDate: editedUser.expiredDate
        }
        return writeJsonRes<any>(res, 200, {
            // @ts-ignore
            token: getJwtToken(tokenData, process.env.JWT_USER_SECRET)
        }, "Successfully edited your info!");
    } catch (error) {
        console.log("EDIT USER", error);
        return writeJsonRes<null>(res, 500, null, "Internal Server Error!");
    }
}