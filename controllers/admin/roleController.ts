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

        // RoleResInterface[]
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

export const addPermissionToRole = async (req: Request, res: Response) => {
    try {
        const existedPermission = await prisma.permissions.findFirst({
            where: {
                id: req.body.permission,
                role: {
                    some: {
                        id: req.params.roleId
                    }
                }
            }
        })

        if(existedPermission) {
            return writeJsonRes<null>(res, 400, null, "Permission already existed!");
        }

        await prisma.roles.update({
            where: {
                id: req.params.roleId
            },
            data: {
                permissions: {      
                    connect: {id: req.body.permission}
                }
            }
        })

        return writeJsonRes<null>(res, 200, null, "Successfully added!");
    } catch (error) {
        logError(error, "Add Permission to Role Controller");
        return writeJsonRes<null>(res, 500, null, "Internal Server Error!");
    }
}

export const removePermissionFromRole = async (req: Request, res: Response) => {
    try {
        await prisma.roles.update({
            where: { id: req.params.roleId },
            data: {
                permissions: {
                    disconnect: { id: req.body.permission },
                },
            },
        });

        return writeJsonRes<null>(res, 200, null, "Successfully deleted!");
    } catch (error) {
        logError(error, "Remove Permission from Role Controller");
        return writeJsonRes<null>(res, 500, null, "Internal Server Error!");
    }
}

export const createRole = async (req: Request, res: Response) => {
    try {
        const createdRole = await prisma.roles.create({
            data: {
                name: req.body.role
            }
        })

        return writeJsonRes<RoleResInterface>(res, 201, createdRole, "Successfully created!");
    } catch (error) {
        console.log("CREATE ROLE ERROR", error);
        return writeJsonRes<null>(res, 500, null, "Internal Server Error!");
    }
}

export const updateRole = async (req: Request, res: Response) => {
    try {
        const updatedRole = await prisma.roles.update({
            where: { id: req.params.id },
            data: { name: req.body.name }
        })

        return writeJsonRes<RoleResInterface>(res, 200, updatedRole, "Successfully updated!");
    } catch (error) {
        console.log("UPDATE ROLE ERROR", error);
        return writeJsonRes<null>(res, 500, null, "Internal Server Error!");
    }
}

export const deleteRole = async (req: Request, res: Response) => {
    try {
        await prisma.roles.delete({
            where: {
                id: req.params.id
            }
        })

        return writeJsonRes<null>(res, 200, null, "Successfully deleted!"); 
    } catch (error) {
        console.log("DELETE ROLE ERROR", error);
        return writeJsonRes<null>(res, 500, null, "Internal Server Error!");
    }
}