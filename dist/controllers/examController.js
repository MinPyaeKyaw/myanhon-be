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
exports.createAnswer = exports.createQuestion = exports.createSection = exports.createExam = exports.submitExam = exports.getExam = void 0;
const client_1 = require("@prisma/client");
const functions_1 = require("../utils/functions");
const prisma = new client_1.PrismaClient();
const getExam = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sections = yield prisma.examSection.findMany({
            include: {
                questions: {
                    include: { answers: true },
                },
            },
            where: {
                examId: req.params.type,
                levelId: req.params.level,
            },
        });
        return (0, functions_1.writeJsonRes)(res, 200, sections, 'Successfully retrived!');
    }
    catch (error) {
        (0, functions_1.logError)(error, 'Get Exam Controller');
        return (0, functions_1.writeJsonRes)(res, 500, null, 'Internal Server Error!');
    }
});
exports.getExam = getExam;
const submitExam = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reqPayload = {
            userId: 'ca7ae16b-fae4-4c7a-a158-a4735ef31978',
            examId: 'c0551fbd-7370-402d-b395-e060a058bfa1',
            levelId: '0df2038f-a8d1-48bd-86fc-f66d2ff39c65',
            sections: [
                {
                    id: '131468eb-8035-42e4-ac27-a9119abe1bcc',
                    questionCount: 2,
                    questions: [
                        {
                            id: '444d3319-023c-40dc-95a8-cfd40f6d1142',
                            answerId: '7dfa3af7-4a43-4dd3-a069-eba6b3f7e3a9',
                        },
                        {
                            id: '167088a2-c43c-4975-9c20-1e78b3aa71ca',
                            answerId: '0a1cb481-1abd-43c1-9a4b-cd40e4a21444',
                        },
                    ],
                },
                {
                    id: 'd6084289-2588-44de-b159-0435a793827f',
                    questionCount: 2,
                    questions: [
                        {
                            id: '0765bbdd-1e3c-4788-914b-8a7c0ba11f1b',
                            answerId: 'b1c14de0-0fbd-4c54-a79d-7454b191fc0c',
                        },
                        {
                            id: 'ea0b5aec-3cc2-42de-aad0-f3af95b563b6',
                            answerId: '5bf736b8-3a83-4362-bd86-6629b2f0ac87',
                        },
                    ],
                },
            ],
        };
        const sectionIds = [];
        const questionIds = [];
        const answerIds = [];
        let totalScore = 0; // total score of exam for res
        reqPayload.sections.forEach(section => {
            sectionIds.push(section.id);
            section.questions.forEach(question => {
                questionIds.push(question.id);
                answerIds.push(question.answerId);
            });
            totalScore += section.questionCount;
        });
        const sections = yield prisma.examSection.findMany({
            where: {
                id: { in: sectionIds },
            },
            include: {
                questions: {
                    where: {
                        id: { in: questionIds },
                    },
                    include: {
                        answers: {
                            where: { id: { in: answerIds } },
                        },
                    },
                },
            },
        });
        const sectionResults = [];
        let userScore = 0; // user score of exam for res
        sections.forEach(section => {
            const tempResult = {
                section: section.name,
                result: 0,
                totalScore: section.questions.length,
            };
            const reqQuestionCount = reqPayload.sections.filter(s => s.id === section.id)[0].questionCount;
            let correctAnswerCount = 0;
            section.questions.forEach(question => {
                var _a;
                if ((_a = question.answers[0]) === null || _a === void 0 ? void 0 : _a.isCorrect) {
                    correctAnswerCount += 1;
                    userScore += 1;
                }
            });
            tempResult.result = (0, functions_1.calculatePercentage)(correctAnswerCount, reqQuestionCount);
            sectionResults.push(tempResult);
        });
        const result = {
            result: userScore,
            totalScore,
            sectionResults,
        };
        yield prisma.examResult.create({
            data: {
                result,
                examId: reqPayload.examId,
                levelId: reqPayload.levelId,
                userId: reqPayload.userId,
            },
        });
        return (0, functions_1.writeJsonRes)(res, 200, result, 'Successfully retrived!');
    }
    catch (error) {
        (0, functions_1.logError)(error, 'Submit Exam Controller');
        return (0, functions_1.writeJsonRes)(res, 500, null, 'Internal Server Error!');
    }
});
exports.submitExam = submitExam;
// for development, remove later
const createExam = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.exam.create({
            data: {
                name: req.body.name,
                duration: req.body.duration,
            },
        });
        return (0, functions_1.writeJsonRes)(res, 201, 'created', 'Successfully created!');
    }
    catch (error) {
        (0, functions_1.logError)(error, 'Create Exam Controller');
        return (0, functions_1.writeJsonRes)(res, 500, null, 'Internal Server Error!');
    }
});
exports.createExam = createExam;
const createSection = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.examSection.create({
            data: {
                name: req.body.name,
                examId: req.body.examId,
                levelId: req.body.levelId,
            },
        });
        return (0, functions_1.writeJsonRes)(res, 201, 'created', 'Successfully created!');
    }
    catch (error) {
        (0, functions_1.logError)(error, 'Create Section Controller');
        return (0, functions_1.writeJsonRes)(res, 500, null, 'Internal Server Error!');
    }
});
exports.createSection = createSection;
const createQuestion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.examQuestion.create({
            data: {
                question: req.body.question,
                sectionId: req.body.sectionId,
            },
        });
        return (0, functions_1.writeJsonRes)(res, 201, 'created', 'Successfully created!');
    }
    catch (error) {
        (0, functions_1.logError)(error, 'Create Queston Controller');
        return (0, functions_1.writeJsonRes)(res, 500, null, 'Internal Server Error!');
    }
});
exports.createQuestion = createQuestion;
const createAnswer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.examAnswer.create({
            data: {
                answer: req.body.answer,
                isCorrect: req.body.isCorrect,
                questionId: req.body.questionId,
            },
        });
        return (0, functions_1.writeJsonRes)(res, 201, 'created', 'Successfully created!');
    }
    catch (error) {
        (0, functions_1.logError)(error, 'Create Queston Controller');
        return (0, functions_1.writeJsonRes)(res, 500, null, 'Internal Server Error!');
    }
});
exports.createAnswer = createAnswer;
