import express from 'express'

import { submitSuggestion } from '../controllers/suggestion'
import { verifyUserJwt } from '../middlewares/userJwtMiddleware'
import { suggestFormValidation } from '../middlewares/validators/formValidators'

const suggestionRouter = express.Router()

suggestionRouter.post(
  '/suggestion',
  verifyUserJwt,
  suggestFormValidation,
  submitSuggestion,
)

export default suggestionRouter
