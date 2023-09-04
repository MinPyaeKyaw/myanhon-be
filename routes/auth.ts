import express from 'express'
import {
  login,
  resetPassword,
  signup,
  test,
  refreshToken,
  verifyOTPCode,
  sendOTP,
  verifyResetOTPCode,
} from '../controllers/authController'
import { verifyResetPasswordJwt } from '../middlewares/resetPasswordJwtMiddleware'
import { refreshJwtMiddleware } from '../middlewares/refreshJwtMiddleware'
import { verifyOtpJwt } from '../middlewares/otpJwtMiddleware'

const authRouter = express.Router()

authRouter.post('/refresh-token', refreshJwtMiddleware, refreshToken)

authRouter.post('/login', login)

authRouter.post('/signup', signup)

authRouter.post('/verify-otp', verifyOtpJwt, verifyOTPCode)

authRouter.post('/verify-reset-otp', verifyResetOTPCode)

authRouter.post('/send-otp', sendOTP)

authRouter.patch('/reset-password', verifyResetPasswordJwt, resetPassword)

authRouter.post('/test', verifyResetPasswordJwt, test)

export default authRouter
