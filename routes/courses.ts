import express from "express";
import {
  createContent,
  createCourse,
  createInstructor,
  createUserTracking,
  getCourseByID,
  getCourses,
} from "../controllers/courseController";
import { verifyUserJwt } from "../middlewares/userJwtMiddleware";
import { courseQueryValidation } from "../utils/queryValidators";
import { validateCourseQuery } from "../middlewares/courseMiddleware";
import { apiKeyMiddleware } from "../middlewares/apiKeyMiddleware";

const courseRouter = express.Router();

courseRouter.get(
  "/courses",
  apiKeyMiddleware,
  verifyUserJwt,
  courseQueryValidation,
  validateCourseQuery,
  getCourses
);

courseRouter.get(
  "/courses/:id",
  apiKeyMiddleware,
  verifyUserJwt,
  getCourseByID
);

// just for development, remove later
// courseRouter.post('/create-course-instructor', createCourseInstructor);

// just for development, remove later
courseRouter.post("/create-instructor", createInstructor);

// just for development, remove later
courseRouter.post("/course", createCourse);

// just for development, remove later
courseRouter.post("/content", createContent);

// just for development, remove later
courseRouter.post("/track", createUserTracking);

export default courseRouter;
