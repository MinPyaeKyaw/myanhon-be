import express from 'express'
import {
  createContent,
  createCourse,
  createCourseInstructor,
  createInstructor,
  createTest,
  createUserTracking,
  getCourseByID,
  getCourses,
} from '../controllers/courseController'

const courseRouter = express.Router()

courseRouter.get('/courses', getCourses)

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
courseRouter.post('/track', createUserTracking)

export default courseRouter
