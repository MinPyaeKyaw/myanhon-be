import express from 'express';
import { addContent, addInstructor, createCourse, removeContent, removeInstructor } from '../../controllers/admin/courseController';

const adminCourseRoute = express.Router();

adminCourseRoute.post('/create-course', createCourse);

adminCourseRoute.post('/courses/:courseId/add-content', addContent);

adminCourseRoute.post('/courses/:courseId/remove-content', removeContent);

adminCourseRoute.post('/courses/:courseId/add-instructor', addInstructor);

adminCourseRoute.post('/courses/:courseId/remove-instructor', removeInstructor);

export default adminCourseRoute;