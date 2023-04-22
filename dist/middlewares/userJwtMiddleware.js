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
exports.verifyUserJwt = void 0;
const jwt_decode_1 = __importDefault(require("jwt-decode"));
const client_1 = require("@prisma/client");
const functions_1 = require("../utils/functions");
const prisma = new client_1.PrismaClient();
const verifyUserJwt = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = (0, functions_1.getJwtTokenFromReq)(req.headers['authorization']);
        if (!token) {
            return (0, functions_1.writeJsonRes)(res, 401, null, "Unthorizied access!");
        }
        const decodedToken = (0, jwt_decode_1.default)(token);
        if (!decodedToken.id) {
            return (0, functions_1.writeJsonRes)(res, 401, null, "Invalid token!");
        }
        const user = yield prisma.users.findFirst({
            where: {
                id: decodedToken.id
            }
        });
        if (!user) {
            return (0, functions_1.writeJsonRes)(res, 401, null, "Invalid token!");
        }
        next();
    }
    catch (error) {
        console.log('USER JWT VERIFICATION ERROR', error);
        return (0, functions_1.writeJsonRes)(res, 500, null, "Internal Server Error!");
    }
});
exports.verifyUserJwt = verifyUserJwt;
