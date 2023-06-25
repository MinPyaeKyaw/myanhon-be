import {Request, Response} from "express";

import { PrismaClient } from '@prisma/client';
import { RedisClientType, createClient } from 'redis';
import { logError, writeJsonRes } from "../../utils/functions";
import { AdminResInterface } from "../../utils/interfaces";

const prisma: PrismaClient = new PrismaClient();
const redisClient: RedisClientType = createClient();
redisClient.on('error', (err) => console.log('Redis Client Error', err));
redisClient.connect();

export const getAdmins = async (req: Request, res: Response) => {
    try {
        const admins = await prisma.admins.findMany({
            select: {
                id: true,
                email: true,
                name: true,
                roleId: true,
                hasLogin: true,
                latestLogin: true,
                createdAt: true,
                updatedAt: true
            }
        });

        if(!admins) {
            return writeJsonRes<null>(res, 404, null, "No data found!");
        }

        return writeJsonRes<AdminResInterface[]>(res, 200, admins, "Successfully retrived!");
    } catch (error) {
        logError(error, "Get Admins Controller");
        return writeJsonRes<null>(res, 500, null, "Internal Server Error!");
    }
}

export const getAdminById = async (req: Request, res: Response) => {
    try {
        const admin = await prisma.admins.findFirst({
            where: {
                id: req.params.id
            },
            select: {
                id: true,
                email: true,
                name: true,
                roleId: true,
                hasLogin: true,
                latestLogin: true,
                createdAt: true,
                updatedAt: true
            }
        })

        if(!admin) {
            return writeJsonRes<null>(res, 404, null, "No data found!");
        }

        return writeJsonRes<any>(res, 200, admin, "Successfully retrived!");
    } catch (error) {
        logError(error, "Get Admin by ID Controller");
        return writeJsonRes<null>(res, 500, null, "Internal Server Error!");
    }
}

export const changeRole = async (req: Request, res: Response) => {
    try {
        const updatedAdmin = await prisma.admins.update({
            where: {
                id: req.params.id
            },
            data: {
                roleId: req.body.roleId
            },
            select: {
                id: true,
                email: true,
                name: true,
                roleId: true,
                hasLogin: true,
                latestLogin: true,
                createdAt: true,
                updatedAt: true
            }
        })

        return writeJsonRes<any>(res, 200, updatedAdmin, "Successfully changed!");
    } catch (error) {
        logError(error, "Get Admin Change Role Controller");
        return writeJsonRes<null>(res, 500, null, "Internal Server Error!");
    }
}