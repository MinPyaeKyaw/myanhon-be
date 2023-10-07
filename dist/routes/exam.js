"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const examController_1 = require("../controllers/examController");
const userJwtMiddleware_1 = require("../middlewares/jwt/userJwtMiddleware");
const queryValidators_1 = require("../middlewares/validators/queryValidators");
const formValidators_1 = require("../middlewares/validators/formValidators");
const examRouter = express_1.default.Router();
examRouter.post('/exam-submit', userJwtMiddleware_1.verifyUserJwt, formValidators_1.submitExamFormValidation, examController_1.submitExam);
examRouter.get('/exam', userJwtMiddleware_1.verifyUserJwt, queryValidators_1.getExamQueryValidation, examController_1.getExam);
examRouter.get('/exam-questions/:sectionId', userJwtMiddleware_1.verifyUserJwt, queryValidators_1.getQuestionsBySectionValidation, examController_1.getQuestionsBySection);
// for development, remove later
examRouter.post('/exam', examController_1.createExam);
examRouter.post('/exam-section', examController_1.createSection);
examRouter.post('/exam-question', examController_1.createQuestion);
examRouter.post('/exam-answer', examController_1.createAnswer);
examRouter.post('/exam-type', examController_1.createExamType);
exports.default = examRouter;
