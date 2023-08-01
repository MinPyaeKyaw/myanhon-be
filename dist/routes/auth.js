"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const resetPasswordJwtMiddleware_1 = require("../middlewares/resetPasswordJwtMiddleware");
const apiKeyMiddleware_1 = require("../middlewares/apiKeyMiddleware");
const authRouter = express_1.default.Router();
authRouter.post("/login", apiKeyMiddleware_1.apiKeyMiddleware, authController_1.login);
authRouter.post("/signup", apiKeyMiddleware_1.apiKeyMiddleware, authController_1.signup);
authRouter.post("/verify-email", apiKeyMiddleware_1.apiKeyMiddleware, authController_1.verifyEmail);
authRouter.post("/check-email", apiKeyMiddleware_1.apiKeyMiddleware, authController_1.checkEmail);
authRouter.post("/verify-code", apiKeyMiddleware_1.apiKeyMiddleware, authController_1.verifyCode);
authRouter.patch("/reset-password", apiKeyMiddleware_1.apiKeyMiddleware, resetPasswordJwtMiddleware_1.verifyResetPasswordJwt, authController_1.resetPassword);
authRouter.post("/test", resetPasswordJwtMiddleware_1.verifyResetPasswordJwt, authController_1.test);
exports.default = authRouter;
