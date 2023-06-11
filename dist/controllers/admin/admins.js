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
exports.changeRole = exports.getAdminById = exports.getAdmins = void 0;
const client_1 = require("@prisma/client");
const redis_1 = require("redis");
const functions_1 = require("../../utils/functions");
const prisma = new client_1.PrismaClient();
const redisClient = (0, redis_1.createClient)();
redisClient.on('error', (err) => console.log('Redis Client Error', err));
redisClient.connect();
const getAdmins = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const admins = yield prisma.admins.findMany({
            select: {
                id: true,
                email: true,
                name: true,
                roleId: true,
                hasLogin: true,
                latestLogin: true,
                createdAt: true,
                updatedAt: true
            }
        });
        if (!admins) {
            return (0, functions_1.writeJsonRes)(res, 404, null, "No data found!");
        }
        return (0, functions_1.writeJsonRes)(res, 200, admins, "Successfully retrived!");
    }
    catch (error) {
        (0, functions_1.logError)(error, "Get Admins Controller");
        return (0, functions_1.writeJsonRes)(res, 500, null, "Internal Server Error!");
    }
});
exports.getAdmins = getAdmins;
const getAdminById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const admin = yield prisma.admins.findFirst({
            where: {
                id: req.params.id
            },
            select: {
                id: true,
                email: true,
                name: true,
                roleId: true,
                hasLogin: true,
                latestLogin: true,
                createdAt: true,
                updatedAt: true
            }
        });
        if (!admin) {
            return (0, functions_1.writeJsonRes)(res, 404, null, "No data found!");
        }
        return (0, functions_1.writeJsonRes)(res, 200, admin, "Successfully retrived!");
    }
    catch (error) {
        (0, functions_1.logError)(error, "Get Admin by ID Controller");
        return (0, functions_1.writeJsonRes)(res, 500, null, "Internal Server Error!");
    }
});
exports.getAdminById = getAdminById;
const changeRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedAdmin = yield prisma.admins.update({
            where: {
                id: req.params.id
            },
            data: {
                roleId: req.body.roleId
            },
            select: {
                id: true,
                email: true,
                name: true,
                roleId: true,
                hasLogin: true,
                latestLogin: true,
                createdAt: true,
                updatedAt: true
            }
        });
        return (0, functions_1.writeJsonRes)(res, 200, updatedAdmin, "Successfully changed!");
    }
    catch (error) {
        (0, functions_1.logError)(error, "Get Admin Change Role Controller");
        return (0, functions_1.writeJsonRes)(res, 500, null, "Internal Server Error!");
    }
});
exports.changeRole = changeRole;
