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
exports.changePhoneNumber = exports.editUserById = void 0;
const client_1 = require("@prisma/client");
const functions_1 = require("../utils/functions");
const prisma = new client_1.PrismaClient();
const editUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const editedUser = yield prisma.users.update({
            where: {
                id: req.params.id,
            },
            data: {
                name: req.body.name,
                email: req.body.email,
            },
        });
        const tokenData = {
            id: editedUser.id,
            name: editedUser.name,
            email: editedUser.email,
            phone: editedUser.phone,
            isPaid: editedUser.isPaid,
            startDate: editedUser.startDate,
            expiredDate: editedUser.expiredDate,
        };
        const refreshTokenData = {
            id: editedUser === null || editedUser === void 0 ? void 0 : editedUser.id,
        };
        return (0, functions_1.writeJsonRes)(res, 200, {
            accessToken: (0, functions_1.getJwtToken)(tokenData, `${process.env.JWT_USER_SECRET}`, `${process.env.JWT_USER_EXP}`),
            refreshToken: (0, functions_1.getJwtToken)(refreshTokenData, `${process.env.JWT_REFRESH_SECRET}`, `${process.env.JWT_REFRESH_EXP}`),
        }, 'Successfully edited your info!');
    }
    catch (error) {
        (0, functions_1.logError)(error, 'Edit User Controller');
        return (0, functions_1.writeJsonRes)(res, 500, null, 'Internal Server Error!');
    }
});
exports.editUserById = editUserById;
const changePhoneNumber = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedUser = yield prisma.users.update({
            where: {
                id: req.params.id,
            },
            data: {
                phone: req.body.phone,
            },
        });
        return (0, functions_1.writeJsonRes)(res, 200, updatedUser, 'Internal Server Error!');
    }
    catch (error) {
        (0, functions_1.logError)(error, 'Change Phone Controller');
        return (0, functions_1.writeJsonRes)(res, 500, null, 'Internal Server Error!');
    }
});
exports.changePhoneNumber = changePhoneNumber;
