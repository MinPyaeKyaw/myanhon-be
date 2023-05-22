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
exports.createType = exports.getTypes = void 0;
const client_1 = require("@prisma/client");
const redis_1 = require("redis");
const functions_1 = require("../utils/functions");
const enums_1 = require("../utils/enums");
const prisma = new client_1.PrismaClient();
const redisClient = (0, redis_1.createClient)();
redisClient.on('error', (err) => console.log('Redis Client Error', err));
redisClient.connect();
const getTypes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const typesFromCache = yield redisClient.get(enums_1.CACHE_KEYS.TYPES);
        if (typesFromCache) {
            return (0, functions_1.writeJsonRes)(res, 200, JSON.parse(typesFromCache), "Successfully retrived cach!");
        }
        const types = yield prisma.types.findMany();
        // await redisClient.set(CACHE_KEYS.TYPES, JSON.stringify(types));
        return (0, functions_1.writeJsonRes)(res, 200, types, "Successfully retrived!");
    }
    catch (error) {
        (0, functions_1.logError)(error, "Get Types Controller");
        return (0, functions_1.writeJsonRes)(res, 500, null, "Internal Server Error!");
    }
});
exports.getTypes = getTypes;
// just for development, remove later
const createType = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const createdType = yield prisma.types.create({
            data: {
                name: req.body.name
            }
        });
        return (0, functions_1.writeJsonRes)(res, 201, createdType, "Successfully created!");
    }
    catch (error) {
        console.log("CREATE TYPE ERROR", error);
        return (0, functions_1.writeJsonRes)(res, 500, null, "Internal Server Error!");
    }
});
exports.createType = createType;
