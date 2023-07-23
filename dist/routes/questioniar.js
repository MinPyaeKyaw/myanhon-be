"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const questioniar_1 = require("../controllers/questioniar");
const questioniarRouter = express_1.default.Router();
questioniarRouter.get("/questioniars", questioniar_1.getQuizz);
questioniarRouter.post("/questioniar-submit", questioniar_1.submitQuestioniar);
questioniarRouter.post("/questioniar", questioniar_1.createQuizz);
exports.default = questioniarRouter;
