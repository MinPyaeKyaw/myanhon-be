import express from 'express'
import {
  createAnswer,
  createQuestion,
  createExamType,
  getExam,
  getQuestionsBySection,
  createExam,
  createSection,
  submitExam,
} from '../controllers/examController'
import { verifyUserJwt } from '../middlewares/jwt/userJwtMiddleware'
import {
  getExamQueryValidation,
  getQuestionsBySectionValidation,
} from '../middlewares/validators/queryValidators'
import { submitExamFormValidation } from '../middlewares/validators/formValidators'

const examRouter = express.Router()

examRouter.post(
  '/exam-submit',
  verifyUserJwt,
  submitExamFormValidation,
  submitExam,
)

examRouter.get('/exam', verifyUserJwt, getExamQueryValidation, getExam)

examRouter.get(
  '/exam-questions/:sectionId',
  verifyUserJwt,
  getQuestionsBySectionValidation,
  getQuestionsBySection,
)

// for development, remove later
examRouter.post('/exam', createExam)

examRouter.post('/exam-section', createSection)

examRouter.post('/exam-question', createQuestion)

examRouter.post('/exam-answer', createAnswer)

examRouter.post('/exam-type', createExamType)

export default examRouter
