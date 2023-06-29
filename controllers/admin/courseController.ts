import {Request, Response} from "express";

import { PrismaClient } from '@prisma/client';

import { logError, writeJsonRes } from "../../utils/functions";
import { ContentReqInterface, CourseResInterface } from "../../utils/interfaces";

const prisma: PrismaClient = new PrismaClient();

export const createCourse = async (req: Request, res: Response) => {
    try {
        const existedCourse = await prisma.courses.findFirst({
            where: {
                name: req.body.name
            }
        })

        if(existedCourse) {
            return writeJsonRes<null>(res, 400, null, "This course is already existed!");
        }

        const createdCourse = await prisma.$transaction(async (prisma) => {
            const course = await prisma.courses.create({
              data: {
                name: req.body.name,
                duration: req.body.duration,
                isPublic: req.body.isPublic,
                type: req.body.type,
                level: req.body.level
              },
            });

            const contentReqData: ContentReqInterface[] = [];
            req.body.contents.forEach((c: ContentReqInterface) => {
                c.courseId = course.id;
                contentReqData.push(c);
            });
          
            await prisma.contents.createMany({
              data: contentReqData
            });

            return course;
        });

        return writeJsonRes<CourseResInterface>(res, 201, createdCourse, 'Successfully created!');
    } catch (error) {
        logError(error, "Admin Create Course Controller");
        return writeJsonRes<null>(res, 500, null, "Internal Server Error!");
    }
}