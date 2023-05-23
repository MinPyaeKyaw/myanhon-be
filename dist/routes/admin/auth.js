"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../../controllers/admin/authController");
const adminAuthRoute = express_1.default.Router();
adminAuthRoute.get('/test', authController_1.test);
adminAuthRoute.post('/login', authController_1.login);
adminAuthRoute.post('/create-admin', authController_1.createAdmin);
adminAuthRoute.post('/invite-admin', authController_1.inviteAdmin);
adminAuthRoute.post('/check-email', authController_1.checkEmail);
adminAuthRoute.post('/verify-code', authController_1.verfiyCode);
adminAuthRoute.post('/reset-password', authController_1.resetPassword);
exports.default = adminAuthRoute;
