"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseDetailQuery = exports.coursesQuery = void 0;
const functions_1 = require("./functions");
const coursesQuery = (req) => {
    const { type, level, search } = req.query;
    const where = { isPublic: true };
    if (type) {
        Object.assign(where, { type: { contains: type } });
    }
    if (level) {
        Object.assign(where, { level: { contains: level } });
    }
    if (search) {
        Object.assign(where, { name: { mode: 'insensitive', contains: search } });
    }
    return {
        where,
        skip: (0, functions_1.getSkip)(req),
        take: (0, functions_1.getTake)(req),
        include: {
            courseType: true,
            courseLevel: true,
        },
    };
};
exports.coursesQuery = coursesQuery;
const courseDetailQuery = (req) => {
    return {
        where: {
            id: req.params.id,
        },
        include: {
            courseType: true,
            courseLevel: true,
            instructors: true,
            contents: {
                include: {
                    tracking: {
                        where: {
                            userId: req.body.userId,
                        },
                    },
                    tests: {
                        include: {
                            tracking: {
                                where: {
                                    userId: req.body.userId,
                                },
                            },
                            answers: {
                                select: {
                                    answer: true,
                                    id: true,
                                },
                            },
                        },
                    },
                },
            },
        },
    };
};
exports.courseDetailQuery = courseDetailQuery;
