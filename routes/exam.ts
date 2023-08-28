import express from 'express'
import { examQueryValidation } from '../utils/queryValidators'
import {
  createAnswer,
  createExam,
  createQuestion,
  createSection,
  getExam,
  submitExam,
} from '../controllers/examController'

const examRouter = express.Router()

examRouter.post('/exam-submit', submitExam)

examRouter.get('/exam', examQueryValidation, getExam)

// for development, remove later
examRouter.post('/exam', createExam)

examRouter.post('/exam-create-section', createSection)

examRouter.post('/exam-create-question', createQuestion)

examRouter.post('/exam-create-answer', createAnswer)

export default examRouter
