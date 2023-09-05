import express from 'express'
import { createLevel, getLevels } from '../controllers/levelController'

const levelRouter = express.Router()

levelRouter.get('/levels', getLevels)

// just for development, remove later
levelRouter.post('/level', createLevel)

export default levelRouter
