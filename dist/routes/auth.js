"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const formValidators_1 = require("../middlewares/validators/formValidators");
const authPolicies_1 = require("../middlewares/policies/authPolicies");
const refreshJwtMiddleware_1 = require("../middlewares/jwt/refreshJwtMiddleware");
const otpJwtMiddleware_1 = require("../middlewares/jwt/otpJwtMiddleware");
const resetPasswordJwtMiddleware_1 = require("../middlewares/admin/resetPasswordJwtMiddleware");
const userJwtMiddleware_1 = require("../middlewares/jwt/userJwtMiddleware");
const authRouter = express_1.default.Router();
authRouter.post('/refresh-token', refreshJwtMiddleware_1.refreshJwtMiddleware, formValidators_1.refreshTokenValidation, authController_1.refreshToken);
authRouter.post('/login', formValidators_1.loginFormValidation, authController_1.login);
authRouter.post('/signup', formValidators_1.signupFormValidation, authPolicies_1.signupPolicy, authController_1.signup);
authRouter.post('/verify-otp', otpJwtMiddleware_1.verifyOtpJwt, formValidators_1.verifyOTPFormValidation, authController_1.verifyOTPCode);
authRouter.post('/verify-reset-otp', formValidators_1.verifyOTPFormValidation, authController_1.verifyResetOTPCode);
authRouter.post('/send-otp', formValidators_1.sendOTPFormValidation, authController_1.sendOTP);
authRouter.patch('/reset-password', resetPasswordJwtMiddleware_1.verifyResetPasswordJwt, formValidators_1.resetFormValidation, authController_1.resetPassword);
authRouter.post('/confirm-password', userJwtMiddleware_1.verifyUserJwt, formValidators_1.confirmPasswordFormValidation, authController_1.confirmPassword);
authRouter.get('/tokens', authController_1.getTokens);
exports.default = authRouter;
