import express from 'express'
import { changePhoneNumber, editUserById } from '../controllers/userController'
import {
  changePhoneFormValidation,
  editUserProfileFormValidation,
} from '../middlewares/validators/formValidators'
import {
  userChangePhonePolicy,
  userEditProfilePolicy,
} from '../middlewares/policies/userPolicies'
import { verifyUserJwt } from '../middlewares/jwt/userJwtMiddleware'
import { verifyConfirmPasswordJwt } from '../middlewares/jwt/confirmPasswordJwtMiddleware'

const userRouter = express.Router()

userRouter.patch(
  '/user/:id',
  verifyUserJwt,
  editUserProfileFormValidation,
  userEditProfilePolicy,
  editUserById,
)

userRouter.patch(
  '/user/:id/change-phone',
  verifyConfirmPasswordJwt,
  changePhoneFormValidation,
  userChangePhonePolicy,
  changePhoneNumber,
)

export default userRouter
