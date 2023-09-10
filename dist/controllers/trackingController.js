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
exports.setTestTracking = exports.setContentTracking = void 0;
const client_1 = require("@prisma/client");
const functions_1 = require("../utils/functions");
const prisma = new client_1.PrismaClient();
const setContentTracking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existedTracking = yield prisma.contentTracking.findFirst({
            where: {
                userId: req.body.userId,
                contentId: req.body.contentId,
            },
        });
        if (existedTracking) {
            const updatedContentTracking = yield prisma.contentTracking.update({
                where: {
                    id: existedTracking.id,
                },
                data: {
                    completedPercent: req.body.completedPercent,
                },
            });
            return (0, functions_1.writeJsonRes)(res, 200, updatedContentTracking, 'Successfully created!');
        }
        const createdContentTracking = yield prisma.contentTracking.create({
            data: {
                userId: req.body.userId,
                contentId: req.body.contentId,
                completedPercent: req.body.completedPercent,
            },
        });
        return (0, functions_1.writeJsonRes)(res, 200, createdContentTracking, 'Successfully created!');
    }
    catch (error) {
        console.log('CREATE CONTENT TRACk ERROR', error);
        return (0, functions_1.writeJsonRes)(res, 500, null, 'Internal Server Error!');
    }
});
exports.setContentTracking = setContentTracking;
const setTestTracking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existedTestTracking = yield prisma.testTracking.findFirst({
            where: {
                userId: req.body.userId,
                testId: req.body.testId,
            },
        });
        if (existedTestTracking) {
            const updatedTestTracking = yield prisma.testTracking.update({
                where: {
                    id: existedTestTracking.id,
                },
                data: {
                    score: req.body.score,
                },
            });
            return (0, functions_1.writeJsonRes)(res, 200, updatedTestTracking, 'Successfully created!');
        }
        const createdTestTracking = yield prisma.testTracking.create({
            data: {
                userId: req.body.userId,
                testId: req.body.testId,
                score: req.body.score,
            },
        });
        return (0, functions_1.writeJsonRes)(res, 200, createdTestTracking, 'Successfully created!');
    }
    catch (error) {
        console.log('CREATE TEST TRACk ERROR', error);
        return (0, functions_1.writeJsonRes)(res, 500, null, 'Internal Server Error!');
    }
});
exports.setTestTracking = setTestTracking;
