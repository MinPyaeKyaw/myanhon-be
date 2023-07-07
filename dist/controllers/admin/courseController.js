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
exports.removeInstructor = exports.addInstructor = exports.removeContent = exports.addContent = exports.createCourse = void 0;
const client_1 = require("@prisma/client");
const functions_1 = require("../../utils/functions");
const prisma = new client_1.PrismaClient();
const createCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existedCourse = yield prisma.courses.findFirst({
            where: {
                name: req.body.name
            }
        });
        if (existedCourse) {
            return (0, functions_1.writeJsonRes)(res, 400, null, "This course is already existed!");
        }
        const createdCourse = yield prisma.$transaction((prisma) => __awaiter(void 0, void 0, void 0, function* () {
            const course = yield prisma.courses.create({
                data: {
                    name: req.body.name,
                    duration: req.body.duration,
                    isPublic: req.body.isPublic,
                    type: req.body.type,
                    level: req.body.level
                },
            });
            yield prisma.courses.update({
                where: {
                    id: course.id
                },
                data: {
                    instructors: { connect: req.body.instructors.map((inst) => ({ id: inst })) }
                }
            });
            const contentReqData = [];
            req.body.contents.forEach((c) => {
                c.courseId = course.id;
                contentReqData.push(c);
            });
            yield prisma.contents.createMany({
                data: contentReqData
            });
            return course;
        }));
        return (0, functions_1.writeJsonRes)(res, 201, createdCourse, 'Successfully created!');
    }
    catch (error) {
        (0, functions_1.logError)(error, "Admin Create Course Controller");
        return (0, functions_1.writeJsonRes)(res, 500, null, "Internal Server Error!");
    }
});
exports.createCourse = createCourse;
const addContent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existedContent = yield prisma.contents.findFirst({
            where: {
                name: req.body.name,
                courseId: req.params.courseId
            }
        });
        if (existedContent) {
            return (0, functions_1.writeJsonRes)(res, 400, null, "This content name is already used!");
        }
        const content = yield prisma.contents.create({
            data: {
                name: req.body.name,
                thumbnail: req.body.thumbnail,
                url: req.body.url,
                isPublic: req.body.isPublic,
                courseId: req.params.courseId
            }
        });
        return (0, functions_1.writeJsonRes)(res, 201, content, "Successfully created!");
    }
    catch (error) {
        (0, functions_1.logError)(error, "Admin Add Content Controller");
        return (0, functions_1.writeJsonRes)(res, 500, null, "Internal Server Error!");
    }
});
exports.addContent = addContent;
const removeContent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.contents.delete({
            where: {
                id: req.body.contentId
            }
        });
        return (0, functions_1.writeJsonRes)(res, 200, null, "Successfully removed!");
    }
    catch (error) {
        (0, functions_1.logError)(error, "Admin Remove Content Controller");
        return (0, functions_1.writeJsonRes)(res, 500, null, "Internal Server Error!");
    }
});
exports.removeContent = removeContent;
const addInstructor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existedInstructor = yield prisma.instructors.findFirst({
            where: {
                id: req.body.instructorId,
                courses: {
                    some: {
                        id: req.params.coruseId
                    }
                }
            }
        });
        if (existedInstructor) {
            return (0, functions_1.writeJsonRes)(res, 400, null, "This instructor is already exist!");
        }
        yield prisma.instructors.update({
            where: {
                id: req.body.instructorId
            },
            data: {
                courses: {
                    connect: {
                        id: req.params.courseId
                    }
                }
            }
        });
        return (0, functions_1.writeJsonRes)(res, 201, null, "Successfully added!");
    }
    catch (error) {
        (0, functions_1.logError)(error, "Admin Remove Content Controller");
        return (0, functions_1.writeJsonRes)(res, 500, null, "Internal Server Error!");
    }
});
exports.addInstructor = addInstructor;
const removeInstructor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.instructors.update({
            where: { id: req.body.instructorId },
            data: {
                courses: {
                    disconnect: { id: req.params.coruseId }
                }
            }
        });
        return (0, functions_1.writeJsonRes)(res, 200, null, "Successfully removed!");
    }
    catch (error) {
        (0, functions_1.logError)(error, "Admin Remove Content Controller");
        return (0, functions_1.writeJsonRes)(res, 500, null, "Internal Server Error!");
    }
});
exports.removeInstructor = removeInstructor;
