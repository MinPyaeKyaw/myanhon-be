"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyResetPasswordJwt = void 0;
const jwt_decode_1 = __importDefault(require("jwt-decode"));
const functions_1 = require("../utils/functions");
const verifyResetPasswordJwt = (req, res, next) => {
    try {
        const token = (0, functions_1.getJwtTokenFromReq)(req.headers['authorization']);
        if (!token) {
            return (0, functions_1.writeJsonRes)(res, 401, null, "Unthorizied access!");
        }
        const decodedToken = (0, jwt_decode_1.default)(token);
        if (!decodedToken.resetPasswordToken) {
            return (0, functions_1.writeJsonRes)(res, 401, null, "Invalid token!");
        }
        next();
    }
    catch (error) {
        console.log('RESET PASSWORD JWT VERIFICATION ERROR', error);
        return (0, functions_1.writeJsonRes)(res, 500, null, "Internal Server Error!");
    }
};
exports.verifyResetPasswordJwt = verifyResetPasswordJwt;
