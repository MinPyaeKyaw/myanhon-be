import {Request, Response} from "express";
import { PrismaClient } from '@prisma/client';
import { writeJsonRes } from "../utils/functions";
import { LevelResInterface } from "../utils/interfaces";

const prisma: PrismaClient = new PrismaClient();

export const getLevels = async (req: Request, res: Response) => {
    try {
        const levels = await prisma.levels.findMany();
        return writeJsonRes<LevelResInterface[]>(res, 200, levels, "Successfully retrived!");
    } catch (error) {
        return writeJsonRes<null>(res, 500, null, "Internal Server Error!");
    }
}

// just for development, remove later
export const createLevel = async (req: Request, res: Response) => {
    try {
        const createdLevel = await prisma.levels.create({
            data: {
                name: req.body.name
            }
        })

        return writeJsonRes(res, 201, createdLevel, "Successfully created!");
    } catch (error) {
        console.log("CREATE LEVEL ERROR", error);
        return writeJsonRes<null>(res, 500, null, "Internal Server Error!");
    }
}