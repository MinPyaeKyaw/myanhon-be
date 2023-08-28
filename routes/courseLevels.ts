import express from 'express'
import { verifyUserJwt } from '../middlewares/userJwtMiddleware'
import { createLevel, getLevels } from '../controllers/levelController'

const levelRouter = express.Router()

levelRouter.get('/levels', verifyUserJwt, getLevels)

// just for development, remove later
levelRouter.post('/level', createLevel)

export default levelRouter
