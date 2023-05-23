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
const redis_1 = require("redis");
const functions_1 = require("../utils/functions");
const enums_1 = require("../utils/enums");
const prisma = new client_1.PrismaClient();
const redisClient = (0, redis_1.createClient)();
redisClient.on('error', (err) => console.log('Redis Client Error', err));
redisClient.connect();
const getLevels = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const levelsFromCache = yield redisClient.get(enums_1.CACHE_KEYS.LEVELS);
        if (levelsFromCache) {
            return (0, functions_1.writeJsonRes)(res, 200, JSON.parse(levelsFromCache), "Successfully retrived cach!");
        }
        const levels = yield prisma.levels.findMany();
        yield redisClient.set(enums_1.CACHE_KEYS.LEVELS, JSON.stringify(levels));
        return (0, functions_1.writeJsonRes)(res, 200, levels, "Successfully retrived!");
    }
    catch (error) {
        (0, functions_1.logError)(error, "Get Levels Controller");
        return (0, functions_1.writeJsonRes)(res, 500, null, "Internal Server Error!");
    }
});
exports.getLevels = getLevels;
// just for development, remove later
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
