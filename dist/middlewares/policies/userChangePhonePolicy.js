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
exports.userChangePhonePolicy = void 0;
const client_1 = require("@prisma/client");
const functions_1 = require("../../utils/functions");
const prisma = new client_1.PrismaClient();
const userChangePhonePolicy = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = (0, functions_1.getJwtTokenFromReq)(req.headers.authorization);
        if (!token) {
            return (0, functions_1.writeJsonRes)(res, 401, null, 'Unthorizied access!');
        }
        const decodedToken = (0, functions_1.decodeJWT)(token);
        if ((decodedToken === null || decodedToken === void 0 ? void 0 : decodedToken.id) !== req.params.id) {
            return (0, functions_1.writeJsonRes)(res, 401, null, 'Unthorizied access!');
        }
        const existedPhone = yield prisma.users.findFirst({
            where: {
                phone: req.body.phone,
            },
        });
        if (existedPhone) {
            return (0, functions_1.writeJsonRes)(res, 400, null, 'This phone number is already used!');
        }
        next();
    }
    catch (error) {
        (0, functions_1.logError)(error, 'User Edit Profile Policy');
        return (0, functions_1.writeJsonRes)(res, 500, null, 'Internal Server Error!');
    }
});
exports.userChangePhonePolicy = userChangePhonePolicy;
