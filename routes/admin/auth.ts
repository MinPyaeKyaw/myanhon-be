import express from 'express'

import {
  checkEmail,
  createAdmin,
  inviteAdmin,
  login,
  resetPassword,
  test,
  verfiyCode,
} from '../../controllers/admin/authController'
import { verifyResetPasswordJwt } from '../../middlewares/admin/resetPasswordJwtMiddleware'

const adminAuthRoute = express.Router()

// just for development, remove later
adminAuthRoute.get('/test', test)

adminAuthRoute.post('/login', login)

adminAuthRoute.post('/create-admin', createAdmin)

adminAuthRoute.post('/invite-admin', inviteAdmin)

adminAuthRoute.post('/check-email', checkEmail)

adminAuthRoute.post('/verify-code', verfiyCode)

adminAuthRoute.post('/reset-password', verifyResetPasswordJwt, resetPassword)

export default adminAuthRoute
