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
import {
  confirmPasswordFormValidation,
  loginFormValidation,
  refreshTokenValidation,
  resetFormValidation,
  sendOTPFormValidation,
  signupFormValidation,
  verifyOTPFormValidation,
} from '../middlewares/validators/formValidators'
import { signupPolicy } from '../middlewares/policies/authPolicies'
import { refreshJwtMiddleware } from '../middlewares/jwt/refreshJwtMiddleware'
import { verifyOtpJwt } from '../middlewares/jwt/otpJwtMiddleware'
import { verifyResetPasswordJwt } from '../middlewares/admin/resetPasswordJwtMiddleware'
import { verifyUserJwt } from '../middlewares/jwt/userJwtMiddleware'

const authRouter = express.Router()

authRouter.post(
  '/refresh-token',
  refreshJwtMiddleware,
  refreshTokenValidation,
  refreshToken,
)

authRouter.post('/login', loginFormValidation, login)

authRouter.post('/signup', signupFormValidation, signupPolicy, signup)

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
  verifyUserJwt,
  confirmPasswordFormValidation,
  confirmPassword,
)

authRouter.get('/tokens', getTokens)

export default authRouter
