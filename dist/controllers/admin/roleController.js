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
exports.deleteRole = exports.updateRole = exports.createRole = exports.removePermissionFromRole = exports.addPermissionToRole = exports.getRoleById = exports.getRoles = void 0;
const client_1 = require("@prisma/client");
const redis_1 = require("redis");
const functions_1 = require("../../utils/functions");
const prisma = new client_1.PrismaClient();
const redisClient = (0, redis_1.createClient)();
redisClient.on('error', (err) => console.log('Redis Client Error', err));
redisClient.connect();
const getRoles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const roles = yield prisma.roles.findMany({
            include: {
                permissions: true
            }
        });
        // RoleResInterface[]
        return (0, functions_1.writeJsonRes)(res, 200, roles, "Successfully retrived!");
    }
    catch (error) {
        (0, functions_1.logError)(error, "Get Roles Controller");
        return (0, functions_1.writeJsonRes)(res, 500, null, "Internal Server Error!");
    }
});
exports.getRoles = getRoles;
const getRoleById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const role = yield prisma.roles.findFirst({
            where: {
                id: req.params.roleId
            },
            include: {
                permissions: true
            }
        });
        if (!role) {
            return (0, functions_1.writeJsonRes)(res, 404, null, "Not found!");
        }
        return (0, functions_1.writeJsonRes)(res, 200, role, "Successfully retrived!");
    }
    catch (error) {
        (0, functions_1.logError)(error, "Get Role By ID Controller");
        return (0, functions_1.writeJsonRes)(res, 500, null, "Internal Server Error!");
    }
});
exports.getRoleById = getRoleById;
const addPermissionToRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existedPermission = yield prisma.permissions.findFirst({
            where: {
                id: req.body.permission,
                role: {
                    some: {
                        id: req.params.roleId
                    }
                }
            }
        });
        if (existedPermission) {
            return (0, functions_1.writeJsonRes)(res, 400, null, "Permission already existed!");
        }
        yield prisma.roles.update({
            where: {
                id: req.params.roleId
            },
            data: {
                permissions: {
                    connect: { id: req.body.permission }
                }
            }
        });
        return (0, functions_1.writeJsonRes)(res, 200, null, "Successfully added!");
    }
    catch (error) {
        (0, functions_1.logError)(error, "Add Permission to Role Controller");
        return (0, functions_1.writeJsonRes)(res, 500, null, "Internal Server Error!");
    }
});
exports.addPermissionToRole = addPermissionToRole;
const removePermissionFromRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.roles.update({
            where: { id: req.params.roleId },
            data: {
                permissions: {
                    disconnect: { id: req.body.permission },
                },
            },
        });
        return (0, functions_1.writeJsonRes)(res, 200, null, "Successfully deleted!");
    }
    catch (error) {
        (0, functions_1.logError)(error, "Remove Permission from Role Controller");
        return (0, functions_1.writeJsonRes)(res, 500, null, "Internal Server Error!");
    }
});
exports.removePermissionFromRole = removePermissionFromRole;
const createRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const createdRole = yield prisma.roles.create({
            data: {
                name: req.body.role
            }
        });
        return (0, functions_1.writeJsonRes)(res, 201, createdRole, "Successfully created!");
    }
    catch (error) {
        console.log("CREATE ROLE ERROR", error);
        return (0, functions_1.writeJsonRes)(res, 500, null, "Internal Server Error!");
    }
});
exports.createRole = createRole;
const updateRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedRole = yield prisma.roles.update({
            where: { id: req.params.id },
            data: { name: req.body.name }
        });
        return (0, functions_1.writeJsonRes)(res, 200, updatedRole, "Successfully updated!");
    }
    catch (error) {
        console.log("UPDATE ROLE ERROR", error);
        return (0, functions_1.writeJsonRes)(res, 500, null, "Internal Server Error!");
    }
});
exports.updateRole = updateRole;
const deleteRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.roles.delete({
            where: {
                id: req.params.id
            }
        });
        return (0, functions_1.writeJsonRes)(res, 200, null, "Successfully deleted!");
    }
    catch (error) {
        console.log("DELETE ROLE ERROR", error);
        return (0, functions_1.writeJsonRes)(res, 500, null, "Internal Server Error!");
    }
});
exports.deleteRole = deleteRole;
