import express from 'express'
import { verifyUserJwt } from '../middlewares/userJwtMiddleware'
import { editUserById } from '../controllers/userController'
import { userEditProfilePolicy } from '../policies/userEditProfilePolicy'

const userRouter = express.Router()

userRouter.patch(
  '/user/:id',
  verifyUserJwt,
  userEditProfilePolicy,
  editUserById,
)

export default userRouter
