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
exports.signupPolicy = void 0;
const client_1 = require("@prisma/client");
const functions_1 = require("../../utils/functions");
const prisma = new client_1.PrismaClient();
const signupPolicy = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const duplicatedPhone = yield prisma.users.findFirst({
            where: {
                phone: req.body.phone,
            },
        });
        if (duplicatedPhone) {
            return (0, functions_1.writeJsonRes)(res, 409, null, 'This phone number is already used!');
        }
        next();
    }
    catch (error) {
        (0, functions_1.logError)(error, 'User Edit Profile Policy');
        return (0, functions_1.writeJsonRes)(res, 500, null, 'Internal Server Error!');
    }
});
exports.signupPolicy = signupPolicy;
