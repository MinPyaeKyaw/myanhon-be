"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const resetPasswordJwtMiddleware_1 = require("../middlewares/resetPasswordJwtMiddleware");
const refreshJwtMiddleware_1 = require("../middlewares/refreshJwtMiddleware");
const otpJwtMiddleware_1 = require("../middlewares/otpJwtMiddleware");
const authRouter = express_1.default.Router();
authRouter.post('/refresh-token', refreshJwtMiddleware_1.refreshJwtMiddleware, authController_1.refreshToken);
authRouter.post('/login', authController_1.login);
authRouter.post('/signup', authController_1.signup);
authRouter.post('/verify-otp', otpJwtMiddleware_1.verifyOtpJwt, authController_1.verifyOTPCode);
authRouter.post('/resend-otp', authController_1.resendOTP);
authRouter.patch('/reset-password', resetPasswordJwtMiddleware_1.verifyResetPasswordJwt, authController_1.resetPassword);
authRouter.post('/test', resetPasswordJwtMiddleware_1.verifyResetPasswordJwt, authController_1.test);
exports.default = authRouter;
