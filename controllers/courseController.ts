import {Request, Response} from "express";

import { PrismaClient } from '@prisma/client';

import { logError, writeJsonRes } from "../utils/functions";
import { CourseResInterface } from "../utils/interfaces";

const prisma: PrismaClient = new PrismaClient();

export const getCourses = async (req: Request, res: Response) => {
    try {
        const { type, level } = req.query;

        const where = {isPublic: true};
        if (type) {
            Object.assign(where, { type: { contains: type } });
        }
        if (level) {
            Object.assign(where, { level: { contains: level } });
        }

        const courses = await prisma.courses.findMany({
            where,
            skip: req.query.offset && req.query.offset !== '' ? +req.query.offset : 0,
            take: req.query.size && req.query.size !== '' ? +req.query.size : 5,
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
        logError(error, "Get Courses Controller");
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
                courseLevel: true,
                contents: true,
                instructors: true
            }
        })

        if(!course) {
            return writeJsonRes<null>(res, 404, null, "No data found!");
        }

        const userTracking = await prisma.userTracking.findMany({
            where: {
                userId: req.body.userId
            }
        })

        for(let content of course.contents) {
            // @ts-ignore
            content.completedPercent = 0;
            for(let trackedUser of userTracking) {
                if(req.body.userId === trackedUser.userId && content.id === trackedUser.contentId) {
                    // @ts-ignore
                    content.completedPercent = trackedUser.completedPercent;
                }
            }
        }

        return writeJsonRes<CourseResInterface>(res, 200, course, "Successfully retrived!");
    } catch (error) {
        logError(error, "Get Course By ID Controller");
        return writeJsonRes<null>(res, 500, null, "Internal Server Error!")
    }
}

// just for development, remove later
export const createInstructor = async (req: Request, res: Response) => {
    try {
        const createdInstructor = await prisma.instructors.create({
            data: {
                name: "test instructor",
                email: "testinstructor@gmail.com",
                phone: "09450324985",
                description: "this is description",
                photo: "this is photo",
                address: "instructor address",
                password: "instructor password"
            }
        })

        return writeJsonRes<any>(res, 201, createdInstructor, "Successfully created an instructor!");
    } catch (error) {
        return writeJsonRes<null>(res, 500, null, "Internal Server Error!");
    }
}

// just for development, remove later
// export const createCourseInstructor = async (req: Request, res: Response) => {
//     try {
//         const createdCourseInstructor = await prisma.courseInstructor.create({
//             data: {
//                 instructorId: '2c92f7ab-e38a-48cd-8611-70f22f9f2387',
//                 courseId: '06cf43e2-d92d-451d-857f-faeef3458e21'
//             }
//         })

//         return writeJsonRes<any>(res, 201, createdCourseInstructor, "Successfully created course instructor!");
//     } catch (error) {
//         return writeJsonRes<null>(res, 500, null, "Internal Server Error!");
//     }
// }

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