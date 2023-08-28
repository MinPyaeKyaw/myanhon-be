import express from 'express'

import { submitSuggestion } from '../controllers/suggestion'
import { verifyUserJwt } from '../middlewares/userJwtMiddleware'

const suggestionRouter = express.Router()

suggestionRouter.post(
  '/suggestion',
  verifyUserJwt,
  submitSuggestion,
)

export default suggestionRouter
