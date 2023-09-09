import express from 'express'
import {
  setContentTracking,
  setTestTracking,
} from '../controllers/courseController'
import { verifyUserJwt } from '../middlewares/userJwtMiddleware'

const trackingRouter = express.Router()

trackingRouter.post('/track-content', verifyUserJwt, setContentTracking)

trackingRouter.post('/track-test', verifyUserJwt, setTestTracking)

export default trackingRouter
