"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserTracking = exports.createContent = exports.createCourse = exports.getCourseByID = exports.getCourses = void 0;
const client_1 = require("@prisma/client");
const functions_1 = require("../utils/functions");
const prisma = new client_1.PrismaClient();
const getCourses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courses = yield prisma.courses.findMany({
            include: {
                courseType: true,
                courseLevel: true
            }
        });
        if (courses.length < 1) {
            return (0, functions_1.writeJsonRes)(res, 404, null, "No record found!");
        }
        return (0, functions_1.writeJsonRes)(res, 200, courses, "Successfully retrived!");
    }
    catch (error) {
        return (0, functions_1.writeJsonRes)(res, 500, null, "Internal Server Error!");
    }
});
exports.getCourses = getCourses;
const getCourseByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const course = yield prisma.courses.findUnique({
            where: {
                id: req.params.id
            },
            include: {
                courseType: true,
                courseLevel: true
            }
        });
        if (!course) {
            return (0, functions_1.writeJsonRes)(res, 404, null, "No data found!");
        }
        const contentsByCourse = yield prisma.contents.findMany({
            where: {
                courseId: req.params.id
            }
        });
        const userTracking = yield prisma.userTracking.findMany({
            where: {
                userId: req.body.userId
            }
        });
        for (let content of contentsByCourse) {
            // @ts-ignore
            content.completedPercent = 0;
            for (let trackedUser of userTracking) {
                if (req.body.userId === trackedUser.userId && content.id === trackedUser.contentId) {
                    // @ts-ignore
                    content.completedPercent = trackedUser.completedPercent;
                }
            }
        }
        // @ts-ignore
        course.contents = contentsByCourse;
        return (0, functions_1.writeJsonRes)(res, 200, course, "Successfully retrived!");
    }
    catch (error) {
        console.log('COURSE BY ID ERROR', error);
        return (0, functions_1.writeJsonRes)(res, 500, null, "Internal Server Error!");
    }
});
exports.getCourseByID = getCourseByID;
// just for development, remove later
const createCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const createdCourse = yield prisma.courses.create({
            data: {
                name: req.body.name,
                duration: req.body.duration,
                type: req.body.type,
                level: req.body.level
            }
        });
        if (createdCourse) {
            return (0, functions_1.writeJsonRes)(res, 201, createdCourse, "Successfully created!");
        }
    }
    catch (error) {
        return (0, functions_1.writeJsonRes)(res, 500, null, "Internal Server Error!");
    }
});
exports.createCourse = createCourse;
// just for development, remove later
const createContent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const createdContent = yield prisma.contents.create({
            data: {
                name: req.body.name,
                url: req.body.url,
                thumbnail: req.body.thumbnail,
                isPublic: req.body.isPublic,
                courseId: req.body.courseId
            }
        });
        if (createdContent) {
            return (0, functions_1.writeJsonRes)(res, 201, createdContent, "Successfully created!");
        }
    }
    catch (error) {
        return (0, functions_1.writeJsonRes)(res, 500, null, "Internal Server Error!");
    }
});
exports.createContent = createContent;
// just for development, remove later
const createUserTracking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userTracking = yield prisma.userTracking.create({
            data: {
                userId: req.body.userId,
                contentId: req.body.contentId,
                completedPercent: req.body.completedPercent
            }
        });
        return (0, functions_1.writeJsonRes)(res, 200, userTracking, "hee hee!");
    }
    catch (error) {
        console.log('CREATE USER TRACKING ERROR', error);
        return (0, functions_1.writeJsonRes)(res, 500, null, "Internal Server Error!");
    }
});
exports.createUserTracking = createUserTracking;
