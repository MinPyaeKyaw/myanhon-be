import express from 'express';
import { createCourse } from '../../controllers/admin/courseController';

const adminCourseRoute = express.Router();

adminCourseRoute.post('/create-course', createCourse);

export default adminCourseRoute;