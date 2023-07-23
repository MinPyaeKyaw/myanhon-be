import express from "express";

import { submitSuggestion } from "../controllers/suggestion";

const suggestionRouter = express.Router();

suggestionRouter.post("/suggestion", submitSuggestion);

export default suggestionRouter;
