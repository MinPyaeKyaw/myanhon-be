import {Request, Response} from "express";
import { PrismaClient } from '@prisma/client';
import { getJwtToken, writeJsonRes } from "../utils/functions";
import { TokenResInterface } from "../utils/interfaces";

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
        return writeJsonRes<TokenResInterface>(res, 200, {
            // @ts-ignore
            token: getJwtToken(tokenData, process.env.JWT_USER_SECRET)
        }, "Successfully edited your info!");
    } catch (error) {
        console.log("EDIT USER", error);
        return writeJsonRes<null>(res, 500, null, "Internal Server Error!");
    }
}

export const setUserTrack = async (req: Request, res: Response) => {
    try {
        const trackedUser = await prisma.userTracking.findFirst({
            where: {
                userId: req.params.userId,
                contentId: req.body.contentId
            }
        })

        if(trackedUser) {
            await prisma.userTracking.updateMany({
                where: {
                    userId: req.params.userId,
                    contentId: req.body.contentId
                },
                data: {
                    completedPercent: req.body.completedPercent
                }
            });
        }else {
            await prisma.userTracking.create({
                data: {
                    userId: req.params.userId,
                    contentId: req.body.contentId,
                    completedPercent: req.body.completedPercent
                }
            });
        }

        return writeJsonRes<null>(res, 200, null, "Successfully set user tracking!")
    } catch (error) {
        console.log('CREATE USER TRACKING ERROR', error);
        return writeJsonRes<null>(res, 500, null, "Internal Server Error!")
    }
}