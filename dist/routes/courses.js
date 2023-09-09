"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const courseController_1 = require("../controllers/courseController");
const courseRouter = express_1.default.Router();
courseRouter.get('/courses', courseController_1.getCourses);
courseRouter.get('/courses/:id', courseController_1.getCourseByID);
// just for development, remove later
courseRouter.post('/create-instructor', courseController_1.createInstructor);
// just for development, remove later
courseRouter.post('/create-course-instructor', courseController_1.createCourseInstructor);
// just for development, remove later
courseRouter.post('/course', courseController_1.createCourse);
// just for development, remove later
courseRouter.post('/content', courseController_1.createContent);
// just for development, remove later
courseRouter.post('/test', courseController_1.createTest);
// just for development, remove later
courseRouter.post('/test-answer', courseController_1.createTestAnswer);
exports.default = courseRouter;
