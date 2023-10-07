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
exports.createAnswer = exports.createQuestion = exports.createExamType = exports.createSection = exports.createExam = exports.getExamResultsByUser = exports.submitExam = exports.test = exports.getQuestionsBySection = exports.getExam = void 0;
const client_1 = require("@prisma/client");
const functions_1 = require("../utils/functions");
const prisma = new client_1.PrismaClient();
const getExam = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const exam = yield prisma.exam.findFirst({
            where: {
                typeId: req.query.type,
                levelId: req.query.level,
            },
            include: {
                sections: true,
            },
        });
        return (0, functions_1.writeJsonRes)(res, 200, exam, 'Successfully retrived!');
    }
    catch (error) {
        (0, functions_1.logError)(error, 'Get Exam Controller');
        return (0, functions_1.writeJsonRes)(res, 500, null, 'Internal Server Error!');
    }
});
exports.getExam = getExam;
const getQuestionsBySection = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const section = yield prisma.examSection.findUnique({
            where: {
                id: req.params.sectionId,
            },
            include: {
                questions: {
                    take: req.query.questionCount ? +req.query.questionCount : 10,
                    include: {
                        answers: {
                            select: {
                                id: true,
                                answer: true,
                            },
                        },
                    },
                },
            },
        });
        return (0, functions_1.writeJsonRes)(res, 200, section, 'Successfully retrived!');
    }
    catch (error) {
        (0, functions_1.logError)(error, 'Get Sections Controller');
        return (0, functions_1.writeJsonRes)(res, 500, null, 'Internal Server Error!');
    }
});
exports.getQuestionsBySection = getQuestionsBySection;
const test = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const requestedUser = (0, functions_1.getRequestedUser)(req);
        res.json(requestedUser);
    }
    catch (error) {
        console.log(error);
    }
});
exports.test = test;
const submitExam = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const requestedUser = (0, functions_1.getRequestedUser)(req);
        // getting id lists of sections, questions, and answers from request
        const sectionIds = [];
        const questionIds = [];
        const answerIds = [];
        req.body.sections.forEach((section) => {
            sectionIds.push(section.sectionId);
            section.questions.forEach((question) => {
                answerIds.push(question.answerId);
                questionIds.push(question.questionId);
            });
        });
        const sectionsWithAnswers = yield prisma.examSection.findMany({
            where: {
                id: {
                    in: sectionIds,
                },
            },
            include: {
                questions: {
                    where: {
                        id: { in: questionIds },
                    },
                    include: {
                        answers: {
                            where: {
                                id: { in: answerIds },
                            },
                            select: {
                                id: true,
                                isCorrect: true,
                            },
                        },
                    },
                },
            },
        });
        // getting user score of specific sections
        const sectionResults = [];
        sectionsWithAnswers.forEach((section) => {
            let userScore = 0;
            section.questions.forEach((question) => {
                if (question.answers[0].isCorrect) {
                    userScore++;
                }
            });
            sectionResults.push({
                sectionId: section.id,
                totalScore: section.totalScore,
                requiredMinScore: section.requiredMinScore,
                userScore,
            });
        });
        // getting query to store exam and related section results
        let examUserScore = 0;
        const sectionResultQuery = [];
        sectionResults.forEach((sectionResult) => {
            examUserScore += sectionResult.userScore;
            sectionResultQuery.push({
                userScore: sectionResult.userScore,
                sectionId: sectionResult.sectionId,
                status: (0, functions_1.calculateExamResultStatus)(sectionResult.totalScore, sectionResult.userScore),
            });
        });
        const exam = yield prisma.exam.findFirst({
            where: {
                id: req.body.examId,
            },
            include: {
                type: true,
                level: true,
            },
        });
        const examResultQuery = {
            data: {
                totalScore: (exam === null || exam === void 0 ? void 0 : exam.totalScore) || 0,
                requiredMinScore: (exam === null || exam === void 0 ? void 0 : exam.requiredMinScore) || 0,
                userScore: examUserScore,
                levelId: (_a = exam === null || exam === void 0 ? void 0 : exam.levelId) !== null && _a !== void 0 ? _a : '',
                typeId: (_b = exam === null || exam === void 0 ? void 0 : exam.typeId) !== null && _b !== void 0 ? _b : '',
                status: (0, functions_1.calculateExamResultStatus)(exam === null || exam === void 0 ? void 0 : exam.totalScore, examUserScore),
                userId: requestedUser.id,
                sections: {
                    create: sectionResultQuery,
                },
            },
            include: {
                sections: true,
            },
        };
        // storing exam result by user
        const examResult = yield prisma.userExamResult.create(examResultQuery);
        return (0, functions_1.writeJsonRes)(res, 200, examResult, 'Successfully submitted!');
    }
    catch (error) {
        (0, functions_1.logError)(error, 'Submit Exam Controller');
        return (0, functions_1.writeJsonRes)(res, 500, null, 'Internal Server Error!');
    }
});
exports.submitExam = submitExam;
const getExamResultsByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const examResultByUser = yield prisma.userExamResult.findMany({
            where: {
                userId: req.params.userId,
            },
            include: {
                sections: {
                    include: {
                        section: true,
                    },
                },
                level: true,
                type: true,
            },
        });
        return (0, functions_1.writeJsonRes)(res, 500, examResultByUser, 'Successfully retrived!');
    }
    catch (error) {
        (0, functions_1.logError)(error, 'Get Exam Result By User Controller');
        return (0, functions_1.writeJsonRes)(res, 500, null, 'Internal Server Error!');
    }
});
exports.getExamResultsByUser = getExamResultsByUser;
// for development, remove later
const createExam = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const exam = yield prisma.exam.create({
            data: {
                totalScore: req.body.totalScore,
                requiredMinScore: req.body.requiredMinScore,
                duration: req.body.duration,
                typeId: req.body.typeId,
                levelId: req.body.levelId,
            },
        });
        return (0, functions_1.writeJsonRes)(res, 500, exam, 'Successfully created!');
    }
    catch (error) {
        (0, functions_1.logError)(error, 'Create Exam Controller');
        return (0, functions_1.writeJsonRes)(res, 500, null, 'Internal Server Error!');
    }
});
exports.createExam = createExam;
const createSection = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const section = yield prisma.examSection.create({
            data: {
                name: req.body.name,
                questionCount: req.body.questionCount,
                requiredMinScore: req.body.requiredMinScore,
                totalScore: req.body.totalScore,
                duration: req.body.duration,
                examId: req.body.examId,
            },
        });
        return (0, functions_1.writeJsonRes)(res, 500, section, 'Successfully created!');
    }
    catch (error) {
        (0, functions_1.logError)(error, 'Create Section Controller');
        return (0, functions_1.writeJsonRes)(res, 500, null, 'Internal Server Error!');
    }
});
exports.createSection = createSection;
const createExamType = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const examType = yield prisma.examType.create({
            data: {
                name: req.body.name,
            },
        });
        return (0, functions_1.writeJsonRes)(res, 201, examType, 'Successfully created!');
    }
    catch (error) {
        (0, functions_1.logError)(error, 'Create Exam Type Controller');
        return (0, functions_1.writeJsonRes)(res, 500, null, 'Internal Server Error!');
    }
});
exports.createExamType = createExamType;
const createQuestion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const question = yield prisma.examQuestion.create({
            data: {
                question: req.body.question,
                sectionId: req.body.sectionId,
            },
        });
        return (0, functions_1.writeJsonRes)(res, 201, question, 'Successfully created!');
    }
    catch (error) {
        (0, functions_1.logError)(error, 'Create Queston Controller');
        return (0, functions_1.writeJsonRes)(res, 500, null, 'Internal Server Error!');
    }
});
exports.createQuestion = createQuestion;
const createAnswer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const answer = yield prisma.examAnswer.create({
            data: {
                answer: req.body.answer,
                isCorrect: req.body.isCorrect,
                questionId: req.body.questionId,
            },
        });
        return (0, functions_1.writeJsonRes)(res, 201, answer, 'Successfully created!');
    }
    catch (error) {
        (0, functions_1.logError)(error, 'Create Answer Controller');
        return (0, functions_1.writeJsonRes)(res, 500, null, 'Internal Server Error!');
    }
});
exports.createAnswer = createAnswer;
