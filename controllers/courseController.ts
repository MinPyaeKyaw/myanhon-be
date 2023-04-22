import {Request, Response} from "express";
import { PrismaClient } from '@prisma/client';
import { writeJsonRes } from "../utils/functions";

const prisma: PrismaClient = new PrismaClient();

export const getCourses = async (req: Request, res: Response) => {
    try {
        const courses = await prisma.courses.findMany();
    } catch (error) {
        
    }
}

export const getCourseByID = async (req: Request, res: Response) => {
    try {
        const course = await prisma.courses.findFirst({
            where: {
                id: req.params.id
            },
            include: {
                courseType: true,
                courseLevel: true,
                contents: true
            }
        })

        if(!course) {
            return writeJsonRes<null>(res, 404, null, "No data found!");
        }

    } catch (error) {
        
    }
}