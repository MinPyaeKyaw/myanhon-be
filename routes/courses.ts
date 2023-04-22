import express from "express";
import { getCourseByID, getCourses } from "../controllers/courseController";

const courseRouter = express.Router();

// courseRouter.get('/courses', getCourses);

// courseRouter.get('/courses/:id', getCourseByID);

export default courseRouter;