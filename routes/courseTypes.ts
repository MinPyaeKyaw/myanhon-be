import express from 'express'
import { createType, getTypes } from '../controllers/typeController'

const typeRouter = express.Router()

typeRouter.get('/types', getTypes)

typeRouter.post('/type', createType)

export default typeRouter
