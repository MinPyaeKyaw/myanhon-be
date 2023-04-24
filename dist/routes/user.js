"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userJwtMiddleware_1 = require("../middlewares/userJwtMiddleware");
const userController_1 = require("../controllers/userController");
const userRouter = express_1.default.Router();
userRouter.patch('/user/:id', userJwtMiddleware_1.verifyUserJwt, userController_1.editUserById);
exports.default = userRouter;
