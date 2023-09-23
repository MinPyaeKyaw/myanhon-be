import express from 'express'
import {
  createContent,
  createCourse,
  createCourseInstructor,
  createInstructor,
  createTest,
  createTestAnswer,
  getCourseByID,
  getCourses,
} from '../controllers/courseController'
import { getCoursesQueryValidation } from '../middlewares/validators/queryValidators'

const courseRouter = express.Router()

courseRouter.get('/courses', getCoursesQueryValidation, getCourses)

courseRouter.get('/courses/:id', getCourseByID)

// just for development, remove later
courseRouter.post('/create-instructor', createInstructor)

// just for development, remove later
courseRouter.post('/create-course-instructor', createCourseInstructor)

// just for development, remove later
courseRouter.post('/course', createCourse)

// just for development, remove later
courseRouter.post('/content', createContent)

// just for development, remove later
courseRouter.post('/test', createTest)

// just for development, remove later
courseRouter.post('/test-answer', createTestAnswer)

export default courseRouter
