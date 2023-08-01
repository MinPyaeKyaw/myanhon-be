"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const courseController_1 = require("../controllers/courseController");
const userJwtMiddleware_1 = require("../middlewares/userJwtMiddleware");
const queryValidators_1 = require("../utils/queryValidators");
const courseMiddleware_1 = require("../middlewares/courseMiddleware");
const apiKeyMiddleware_1 = require("../middlewares/apiKeyMiddleware");
const courseRouter = express_1.default.Router();
courseRouter.get("/courses", apiKeyMiddleware_1.apiKeyMiddleware, userJwtMiddleware_1.verifyUserJwt, queryValidators_1.courseQueryValidation, courseMiddleware_1.validateCourseQuery, courseController_1.getCourses);
courseRouter.get("/courses/:id", apiKeyMiddleware_1.apiKeyMiddleware, userJwtMiddleware_1.verifyUserJwt, courseController_1.getCourseByID);
// just for development, remove later
// courseRouter.post('/create-course-instructor', createCourseInstructor);
// just for development, remove later
courseRouter.post("/create-instructor", courseController_1.createInstructor);
// just for development, remove later
courseRouter.post("/course", courseController_1.createCourse);
// just for development, remove later
courseRouter.post("/content", courseController_1.createContent);
// just for development, remove later
courseRouter.post("/track", courseController_1.createUserTracking);
exports.default = courseRouter;
