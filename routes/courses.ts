import express from "express";
import { createContent, createCourse, createInstructor, createUserTracking, getCourseByID, getCourses } from "../controllers/courseController";
import { verifyUserJwt } from "../middlewares/userJwtMiddleware";
import { courseQueryValidation } from "../utils/queryValidators";
import { validateCourseQuery } from "../middlewares/courseMiddleware";

const courseRouter = express.Router();

courseRouter.get('/courses', verifyUserJwt, courseQueryValidation, validateCourseQuery, getCourses);

courseRouter.get('/courses/:id', verifyUserJwt, getCourseByID);

// just for development, remove later
// courseRouter.post('/create-course-instructor', createCourseInstructor);

// just for development, remove later
courseRouter.post('/create-instructor', createInstructor);

// just for development, remove later
courseRouter.post("/course", createCourse);

// just for development, remove later
courseRouter.post("/content", createContent);

// just for development, remove later
courseRouter.post("/track", createUserTracking);

export default courseRouter;