"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userJwtMiddleware_1 = require("../middlewares/userJwtMiddleware");
const levelController_1 = require("../controllers/levelController");
const levelRouter = express_1.default.Router();
levelRouter.get('/levels', userJwtMiddleware_1.verifyUserJwt, levelController_1.getLevels);
levelRouter.post('/level', levelController_1.createLevel);
exports.default = levelRouter;
