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
exports.editUserById = void 0;
const client_1 = require("@prisma/client");
const functions_1 = require("../utils/functions");
const enums_1 = require("../utils/enums");
const prisma = new client_1.PrismaClient();
const editUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prisma.users.findUnique({
            where: {
                id: req.params.id,
            },
        });
        if (!user) {
            return (0, functions_1.writeJsonRes)(res, 404, null, 'User not found!');
        }
        const editedUser = yield prisma.users.update({
            where: {
                id: req.params.id,
            },
            data: {
                name: req.body.name,
                email: req.body.email,
                // phone: req.body.phone,
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
            id: user === null || user === void 0 ? void 0 : user.id,
        };
        return (0, functions_1.writeJsonRes)(res, 200, {
            accessToken: (0, functions_1.getJwtToken)(tokenData, enums_1.JWT_TYPES.ACCESS),
            refreshToken: (0, functions_1.getJwtToken)(refreshTokenData, enums_1.JWT_TYPES.ACCESS),
        }, 'Successfully edited your info!');
    }
    catch (error) {
        (0, functions_1.logError)(error, 'Edit User Controller');
        return (0, functions_1.writeJsonRes)(res, 500, null, 'Internal Server Error!');
    }
});
exports.editUserById = editUserById;
