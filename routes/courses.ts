import express from "express";
import { createContent, createCourse, createUserTracking, getCourseByID, getCourses } from "../controllers/courseController";
import { verifyUserJwt } from "../middlewares/userJwtMiddleware";

const courseRouter = express.Router();

courseRouter.get('/courses', verifyUserJwt, getCourses);

courseRouter.get('/courses/:id', verifyUserJwt, getCourseByID);

// just for development, remove later
courseRouter.post("/course", createCourse);

// just for development, remove later
courseRouter.post("/content", createContent);

// just for development, remove later
courseRouter.post("/track", createUserTracking);

export default courseRouter;