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
exports.createQuizz = exports.submitQuestioniar = exports.getQuizz = void 0;
const client_1 = require("@prisma/client");
const functions_1 = require("../utils/functions");
const prisma = new client_1.PrismaClient();
const getQuizz = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const quizz = yield prisma.questioniarsQuizz.findMany({
            include: {
                answers: true,
            },
        });
        return (0, functions_1.writeJsonRes)(res, 200, quizz, "Successfully retrived!");
    }
    catch (error) {
        (0, functions_1.logError)(error, "Get Questioniar Controller");
        return (0, functions_1.writeJsonRes)(res, 500, null, "Internal Server Error!");
    }
});
exports.getQuizz = getQuizz;
const submitQuestioniar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let promises = [];
        req.body.payload.forEach((answer) => __awaiter(void 0, void 0, void 0, function* () {
            const oldCount = yield prisma.questioniarAnswer.findFirst({
                where: { id: answer },
            });
            if (oldCount) {
                const updateCount = yield prisma.questioniarAnswer.update({
                    where: { id: answer },
                    data: {
                        count: (oldCount === null || oldCount === void 0 ? void 0 : oldCount.count) + 1,
                    },
                });
                promises.push(updateCount);
            }
        }));
        Promise.all(promises).then((result) => {
            return (0, functions_1.writeJsonRes)(res, 200, null, "Successfully submitted!");
        });
    }
    catch (error) {
        (0, functions_1.logError)(error, "Submit Questioniar Controller");
        return (0, functions_1.writeJsonRes)(res, 500, null, "Internal Server Error!");
    }
});
exports.submitQuestioniar = submitQuestioniar;
const createQuizz = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const quizz = yield prisma.questioniarsQuizz.create({
            data: {
                question: req.body.question,
                answers: {
                    create: req.body.answers.map((a) => ({
                        answer: a,
                        count: 0,
                    })),
                },
            },
        });
        return (0, functions_1.writeJsonRes)(res, 200, quizz, "Good Good!");
    }
    catch (error) {
        (0, functions_1.logError)(error, "Get Questioniar Controller");
        return (0, functions_1.writeJsonRes)(res, 500, null, "Internal Server Error!");
    }
});
exports.createQuizz = createQuizz;
