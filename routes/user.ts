import express from 'express'
import { verifyUserJwt } from '../middlewares/userJwtMiddleware'
import { editUserById, setUserTrack } from '../controllers/userController'

const userRouter = express.Router()

userRouter.patch('/user/:id', verifyUserJwt, editUserById)

userRouter.post('/user/:userId', verifyUserJwt, setUserTrack)

export default userRouter
