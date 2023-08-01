import express from "express";

import { submitSuggestion } from "../controllers/suggestion";
import { verifyUserJwt } from "../middlewares/userJwtMiddleware";
import { apiKeyMiddleware } from "../middlewares/apiKeyMiddleware";

const suggestionRouter = express.Router();

suggestionRouter.post(
  "/suggestion",
  apiKeyMiddleware,
  verifyUserJwt,
  submitSuggestion
);

export default suggestionRouter;
