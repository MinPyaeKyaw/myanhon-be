"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const queryValidators_1 = require("../utils/queryValidators");
const examController_1 = require("../controllers/examController");
const examRouter = express_1.default.Router();
examRouter.post("/exam-submit", examController_1.submitExam);
examRouter.get("/exam", queryValidators_1.examQueryValidation, examController_1.getExam);
// for development, remove later
examRouter.post("/exam", examController_1.createExam);
examRouter.post("/exam-create-section", examController_1.createSection);
examRouter.post("/exam-create-question", examController_1.createQuestion);
examRouter.post("/exam-create-answer", examController_1.createAnswer);
exports.default = examRouter;
