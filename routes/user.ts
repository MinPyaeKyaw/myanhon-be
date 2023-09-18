import express from 'express'
import { verifyUserJwt } from '../middlewares/userJwtMiddleware'
import { editUserById } from '../controllers/userController'
import { userEditProfilePolicy } from '../policies/userEditProfilePolicy'
import { editUserProfileFormValidation } from '../middlewares/validators/formValidators'

const userRouter = express.Router()

userRouter.patch(
  '/user/:id',
  verifyUserJwt,
  editUserProfileFormValidation,
  userEditProfilePolicy,
  editUserById,
)

export default userRouter
