import {Request, Response} from "express";
import { PrismaClient } from '@prisma/client';
import { writeJsonRes } from "../utils/functions";
import { TypesResInterface } from "../utils/interfaces";

const prisma: PrismaClient = new PrismaClient();

export const getTypes = async (req: Request, res: Response) => {
    try {
        const types = await prisma.types.findMany();
        return writeJsonRes<TypesResInterface[]>(res, 200, types, "Successfully retrived!");
    } catch (error) {
        return writeJsonRes<null>(res, 500, null, "Internal Server Error!");
    }
}

// just for development, remove later
export const createType = async (req: Request, res: Response) => {
    try {
        const createdType = await prisma.types.create({
            data: {
                name: req.body.name
            }
        })

        return writeJsonRes(res, 201, createdType, "Successfully created!");
    } catch (error) {
        console.log("CREATE TYPE ERROR", error);
        return writeJsonRes<null>(res, 500, null, "Internal Server Error!");
    }
}