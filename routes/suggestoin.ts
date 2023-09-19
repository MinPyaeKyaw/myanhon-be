import express from 'express'

import { submitSuggestion } from '../controllers/suggestion'
import { suggestFormValidation } from '../middlewares/validators/formValidators'
import { verifyUserJwt } from '../middlewares/jwt/userJwtMiddleware'

const suggestionRouter = express.Router()

suggestionRouter.post(
  '/suggestion',
  verifyUserJwt,
  suggestFormValidation,
  submitSuggestion,
)

export default suggestionRouter
