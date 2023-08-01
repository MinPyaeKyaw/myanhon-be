"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const questioniar_1 = require("../controllers/questioniar");
const apiKeyMiddleware_1 = require("../middlewares/apiKeyMiddleware");
const questioniarRouter = express_1.default.Router();
questioniarRouter.get("/questioniars", apiKeyMiddleware_1.apiKeyMiddleware, questioniar_1.getQuizz);
questioniarRouter.post("/questioniar-submit", apiKeyMiddleware_1.apiKeyMiddleware, questioniar_1.submitQuestioniar);
// just for development, remove later
questioniarRouter.post("/questioniar", questioniar_1.createQuizz);
exports.default = questioniarRouter;
