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
exports.verifyResetPasswordJwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const functions_1 = require("../utils/functions");
const verifyResetPasswordJwt = (req, res, next) => {
    try {
        const token = (0, functions_1.getJwtTokenFromReq)(req.headers.authorization);
        if (!token) {
            return (0, functions_1.writeJsonRes)(res, 401, null, 'Unthorizied access!');
        }
        jsonwebtoken_1.default.verify(token, process.env.JWT_REFRESH_SECRET, (err, decodedToken) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                return (0, functions_1.writeJsonRes)(res, 401, null, 'Unthorizied access!');
            }
            if (!decodedToken.id) {
                return (0, functions_1.writeJsonRes)(res, 401, null, 'Unthorizied access!');
            }
            next();
        }));
    }
    catch (error) {
        (0, functions_1.logError)(error, 'Verify Reset Password JWT Middleware');
        return (0, functions_1.writeJsonRes)(res, 500, null, 'Internal Server Error!');
    }
};
exports.verifyResetPasswordJwt = verifyResetPasswordJwt;
