import express from 'express'
import { verifyUserJwt } from '../middlewares/userJwtMiddleware'
import { editUserById } from '../controllers/userController'

const userRouter = express.Router()

userRouter.patch('/user/:id', verifyUserJwt, editUserById)

export default userRouter
