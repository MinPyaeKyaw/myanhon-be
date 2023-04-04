"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const authRouter = express_1.default.Router();
const prisma = new client_1.PrismaClient();
authRouter.post('/login', (req, res) => {
    res.send("Log in");
});
authRouter.post('/signup', (req, res) => {
    res.send("Signup");
});
authRouter.post('/forgot-password', (req, res) => {
    res.send("Forgot password");
});
exports.default = authRouter;
