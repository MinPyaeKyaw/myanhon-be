import {Request, Response} from "express";

import { PrismaClient } from '@prisma/client';
import { RedisClientType, createClient } from 'redis';
import { logError, writeJsonRes } from "../../utils/functions";
import { PermissionResInterface } from "../../utils/interfaces";

const prisma: PrismaClient = new PrismaClient();
const redisClient: RedisClientType = createClient();
redisClient.on('error', (err) => console.log('Redis Client Error', err));
redisClient.connect();

export const getPermissions = async (req: Request, res: Response) => {
    try {
        const permissions = await prisma.permissions.findMany();
        return writeJsonRes<PermissionResInterface[]>(res, 200, permissions, "Successfully retrived!");
    } catch (error) {
        logError(error, "Get Permission Controller");
        return writeJsonRes<null>(res, 500, null, "Internal Server Error!");
    }
}

// just for development, remove later
export const createPermission = async (req: Request, res: Response) => {
    try {
        const createdPermission = await prisma.permissions.create({
            data: {
                name: req.body.name,
                roleId: req.body.roleId
            }
        })

        return writeJsonRes(res, 201, createdPermission, "Successfully created!");
    } catch (error) {
        console.log("CREATE PERMISSION ERROR", error);
        return writeJsonRes<null>(res, 500, null, "Internal Server Error!");
    }
}