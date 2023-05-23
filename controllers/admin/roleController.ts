import {Request, Response} from "express";

import { PrismaClient } from '@prisma/client';
import { RedisClientType, createClient } from 'redis';
import { logError, writeJsonRes } from "../../utils/functions";
import { RoleResInterface } from "../../utils/interfaces";

const prisma: PrismaClient = new PrismaClient();
const redisClient: RedisClientType = createClient();
redisClient.on('error', (err) => console.log('Redis Client Error', err));
redisClient.connect();

export const getRoles = async (req: Request, res: Response) => {
    try {
        const roles = await prisma.roles.findMany({
            include: {
                permissions: true
            }
        });
        return writeJsonRes<RoleResInterface[]>(res, 200, roles, "Successfully retrived!");
    } catch (error) {
        logError(error, "Get Roles Controller");
        return writeJsonRes<null>(res, 500, null, "Internal Server Error!");
    }
}

export const getRoleById = async (req: Request, res: Response) => {
    try {
        const role = await prisma.roles.findFirst({
            where: {
                id: req.params.roleId
            },
            include: {
                permissions: true
            }
        })

        if(!role) {
            return writeJsonRes<null>(res, 404, null, "Not found!");
        }

        return writeJsonRes<RoleResInterface>(res, 200, role, "Successfully retrived!");
    } catch (error) {
        logError(error, "Get Role By ID Controller");
        return writeJsonRes<null>(res, 500, null, "Internal Server Error!");
    }
}

// just for development, remove later
export const createRole = async (req: Request, res: Response) => {
    try {
        const createdRole = await prisma.roles.create({
            data: {
                name: req.body.name
            }
        })

        return writeJsonRes(res, 201, createdRole, "Successfully created!");
    } catch (error) {
        console.log("CREATE ROLE ERROR", error);
        return writeJsonRes<null>(res, 500, null, "Internal Server Error!");
    }
}