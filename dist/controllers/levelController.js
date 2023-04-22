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
exports.createLevel = exports.getLevels = void 0;
const client_1 = require("@prisma/client");
const functions_1 = require("../utils/functions");
const prisma = new client_1.PrismaClient();
const getLevels = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const levels = yield prisma.levels.findMany();
        return (0, functions_1.writeJsonRes)(res, 200, levels, "Successfully retrived!");
    }
    catch (error) {
        return (0, functions_1.writeJsonRes)(res, 500, null, "Internal Server Error!");
    }
});
exports.getLevels = getLevels;
const createLevel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const createdLevel = yield prisma.levels.create({
            data: {
                name: req.body.name
            }
        });
        return (0, functions_1.writeJsonRes)(res, 201, createdLevel, "Successfully created!");
    }
    catch (error) {
        console.log("CREATE LEVEL ERROR", error);
        return (0, functions_1.writeJsonRes)(res, 500, null, "Internal Server Error!");
    }
});
exports.createLevel = createLevel;
