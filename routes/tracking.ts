import express from 'express'
import { verifyUserJwt } from '../middlewares/userJwtMiddleware'
import {
  setContentTracking,
  setTestTracking,
} from '../controllers/trackingController'
import {
  contentTrackingValidation,
  testTrackingValidation,
} from '../middlewares/validators/formValidators'

const trackingRouter = express.Router()

trackingRouter.post(
  '/track-content',
  contentTrackingValidation,
  verifyUserJwt,
  setContentTracking,
)

trackingRouter.post(
  '/track-test',
  testTrackingValidation,
  verifyUserJwt,
  setTestTracking,
)

export default trackingRouter
