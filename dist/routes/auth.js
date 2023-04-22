"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const resetPasswordJwtMiddleware_1 = require("../middlewares/resetPasswordJwtMiddleware");
const authRouter = express_1.default.Router();
authRouter.post('/login', authController_1.login);
authRouter.post('/signup', authController_1.signup);
authRouter.post('/verify-email', authController_1.verifyEmail);
authRouter.post('/check-email', authController_1.checkEmail);
authRouter.post('/verify-code', authController_1.verifyCode);
authRouter.patch('/reset-password', resetPasswordJwtMiddleware_1.verifyResetPasswordJwt, authController_1.resetPassword);
authRouter.post('/test', resetPasswordJwtMiddleware_1.verifyResetPasswordJwt, authController_1.test);
exports.default = authRouter;
