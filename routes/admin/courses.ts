import express from 'express'

import multer from 'multer'

import {
  addContent,
  addInstructor,
  createCourse,
  removeContent,
  removeInstructor,
  testUpload,
} from '../../controllers/admin/courseController'
import { uploadFile } from '../../utils/functions'

// const uploadFile = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, 'uploads/');
//     },
//     filename: (req, file, cb) => {
//       cb(null, Date.now() + '-' + file.originalname);
//     }
// });

const adminCourseRoute = express.Router()

adminCourseRoute.post('/test-upload', uploadFile().single('file'), testUpload)

adminCourseRoute.post('/create-course', createCourse)

adminCourseRoute.post('/courses/:courseId/add-content', addContent)

adminCourseRoute.post('/courses/:courseId/remove-content', removeContent)

adminCourseRoute.post('/courses/:courseId/add-instructor', addInstructor)

adminCourseRoute.post('/courses/:courseId/remove-instructor', removeInstructor)

export default adminCourseRoute
