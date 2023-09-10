import express from 'express'
import { verifyUserJwt } from '../middlewares/userJwtMiddleware'
import {
  setContentTracking,
  setTestTracking,
} from '../controllers/trackingController'

const trackingRouter = express.Router()

trackingRouter.post('/track-content', verifyUserJwt, setContentTracking)

trackingRouter.post('/track-test', verifyUserJwt, setTestTracking)

export default trackingRouter
