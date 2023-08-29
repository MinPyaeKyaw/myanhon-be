import express from 'express'
import {
  checkEmail,
  login,
  resetPassword,
  signup,
  verifyEmail,
  verifyCode,
  test,
} from '../controllers/authController'
import { verifyResetPasswordJwt } from '../middlewares/resetPasswordJwtMiddleware'

const authRouter = express.Router()

authRouter.post('/login', login)

authRouter.post('/signup', signup)

authRouter.post('/verify-email', verifyEmail)

authRouter.post('/check-email', checkEmail)

authRouter.post('/verify-code', verifyCode)

authRouter.patch('/reset-password', verifyResetPasswordJwt, resetPassword)

authRouter.post('/test', verifyResetPasswordJwt, test)

export default authRouter
