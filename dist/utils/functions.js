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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJwtTokenFromReq = exports.getJwtToken = exports.verifyPassword = exports.hashPassword = exports.refreshVerificationCode = exports.generateOTPCode = exports.writeJsonRes = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const writeJsonRes = (res, status, data, message) => {
    return res.status(status)
        .json({
        status: status,
        message: message,
        data: data
    })
        .end();
};
exports.writeJsonRes = writeJsonRes;
const generateOTPCode = () => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 6; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result.toUpperCase();
};
exports.generateOTPCode = generateOTPCode;
const refreshVerificationCode = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const prisma = new client_1.PrismaClient();
    try {
        const newCode = (0, exports.generateOTPCode)();
        const updateCode = yield prisma.users.update({
            where: {
                email: email
            },
            data: {
                verificationCode: newCode
            }
        });
        if (updateCode) {
            return true;
        }
    }
    catch (error) {
        return false;
    }
});
exports.refreshVerificationCode = refreshVerificationCode;
const hashPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcrypt_1.default.hash(password, 10);
});
exports.hashPassword = hashPassword;
const verifyPassword = (userPassword, dbPassword) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcrypt_1.default.compare(userPassword, dbPassword)
        .then((res) => {
        return res;
    })
        .catch((err) => {
        return false;
    });
});
exports.verifyPassword = verifyPassword;
const getJwtToken = (data, secret) => {
    let token = jsonwebtoken_1.default.sign(data, secret);
    return token;
};
exports.getJwtToken = getJwtToken;
const getJwtTokenFromReq = (authHeader) => {
    if (!authHeader) {
        return false;
    }
    return authHeader && authHeader.split(' ')[1];
};
exports.getJwtTokenFromReq = getJwtTokenFromReq;
