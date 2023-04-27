import {Request, Response} from "express";
import { PrismaClient } from '@prisma/client';
import { writeJsonRes } from "../utils/functions";
import { CourseResInterface } from "../utils/interfaces";

const prisma: PrismaClient = new PrismaClient();

export const getCourses = async (req: Request, res: Response) => {
    try {
        const courses = await prisma.courses.findMany({
            include: {
                courseType: true,
                courseLevel: true
            }
        });

        if(courses.length < 1) {
            return writeJsonRes(res, 404, null, "No record found!");
        }

        return writeJsonRes<CourseResInterface[]>(res, 200, courses, "Successfully retrived!");
    } catch (error) {
        return writeJsonRes<null>(res, 500, null, "Internal Server Error!");
    }
}

export const getCourseByID = async (req: Request, res: Response) => {
    try {
        const course = await prisma.courses.findUnique({
            where: {
                id: req.params.id
            },
            include: {
                courseType: true,
                courseLevel: true
            }
        })

        if(!course) {
            return writeJsonRes<null>(res, 404, null, "No data found!");
        }

        const contentsByCourse = await prisma.contents.findMany({
            where: {
                courseId: req.params.id
            }
        })
        const userTracking = await prisma.userTracking.findMany({
            where: {
                userId: req.body.userId
            }
        })
        for(let content of contentsByCourse) {
            // @ts-ignore
            content.completedPercent = 0;
            for(let trackedUser of userTracking) {
                if(req.body.userId === trackedUser.userId && content.id === trackedUser.contentId) {
                    // @ts-ignore
                    content.completedPercent = trackedUser.completedPercent;
                }
            }
        } 
        // @ts-ignore
        course.contents = contentsByCourse;

        return writeJsonRes<CourseResInterface>(res, 200, course, "Successfully retrived!");
    } catch (error) {
        console.log('COURSE BY ID ERROR', error);
        return writeJsonRes<null>(res, 500, null, "Internal Server Error!")
    }
}

// just for development, remove later
export const createCourse = async (req: Request, res: Response) => {
    try {
        const createdCourse = await prisma.courses.create({
            data: {
                name: req.body.name,
                duration: req.body.duration,
                type: req.body.type,
                level: req.body.level
            }
        })

        if(createdCourse) {
            return writeJsonRes<any>(res, 201, createdCourse, "Successfully created!")
        }
    } catch (error) {
        return writeJsonRes<null>(res, 500, null, "Internal Server Error!")
    }
}

// just for development, remove later
export const createContent = async (req: Request, res: Response) => {
    try {
        const createdContent = await prisma.contents.create({
            data: {
                name: req.body.name,
                url: req.body.url,
                thumbnail: req.body.thumbnail,
                isPublic: req.body.isPublic,
                courseId: req.body.courseId
            }
        })

        if(createdContent) {
            return writeJsonRes<any>(res, 201, createdContent, "Successfully created!");
        }
    } catch (error) {
        return writeJsonRes<null>(res, 500, null, "Internal Server Error!");
    }
}

// just for development, remove later
export const createUserTracking = async (req: Request, res: Response) => {
    try {
        const userTracking = await prisma.userTracking.create({
            data: {
                userId: req.body.userId,
                contentId: req.body.contentId,
                completedPercent: req.body.completedPercent
            }
        })

        return writeJsonRes(res, 200, userTracking, "hee hee!")
    } catch (error) {
        console.log('CREATE USER TRACKING ERROR', error);
        return writeJsonRes<null>(res, 500, null, "Internal Server Error!")
    }
}