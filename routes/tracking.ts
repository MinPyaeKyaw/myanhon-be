import express from 'express'
import {
  setContentTracking,
  setTestTracking,
} from '../controllers/trackingController'
import {
  contentTrackingValidation,
  testTrackingValidation,
} from '../middlewares/validators/formValidators'
import { verifyUserJwt } from '../middlewares/jwt/userJwtMiddleware'

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
