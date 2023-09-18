import express from 'express'
import {
  login,
  resetPassword,
  signup,
  refreshToken,
  verifyOTPCode,
  sendOTP,
  verifyResetOTPCode,
  getTokens,
  confirmPassword,
} from '../controllers/authController'
import { verifyResetPasswordJwt } from '../middlewares/resetPasswordJwtMiddleware'
import { refreshJwtMiddleware } from '../middlewares/refreshJwtMiddleware'
import { verifyOtpJwt } from '../middlewares/otpJwtMiddleware'
import {
  confirmPasswordFormValidation,
  loginFormValidation,
  refreshTokenValidation,
  resetFormValidation,
  sendOTPFormValidation,
  signupFormValidation,
  verifyOTPFormValidation,
} from '../middlewares/validators/formValidators'

const authRouter = express.Router()

authRouter.post(
  '/refresh-token',
  refreshJwtMiddleware,
  refreshTokenValidation,
  refreshToken,
)

authRouter.post('/login', loginFormValidation, login)

authRouter.post('/signup', signupFormValidation, signup)

authRouter.post(
  '/verify-otp',
  verifyOtpJwt,
  verifyOTPFormValidation,
  verifyOTPCode,
)

authRouter.post(
  '/verify-reset-otp',
  verifyOTPFormValidation,
  verifyResetOTPCode,
)

authRouter.post('/send-otp', sendOTPFormValidation, sendOTP)

authRouter.patch(
  '/reset-password',
  verifyResetPasswordJwt,
  resetFormValidation,
  resetPassword,
)

authRouter.post(
  '/confirm-password',
  confirmPasswordFormValidation,
  confirmPassword,
)

authRouter.get('/tokens', getTokens)

export default authRouter
