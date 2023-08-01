import express from "express";
import {
  createQuizz,
  getQuizz,
  submitQuestioniar,
} from "../controllers/questioniar";
import { apiKeyMiddleware } from "../middlewares/apiKeyMiddleware";

const questioniarRouter = express.Router();

questioniarRouter.get("/questioniars", apiKeyMiddleware, getQuizz);

questioniarRouter.post(
  "/questioniar-submit",
  apiKeyMiddleware,
  submitQuestioniar
);

// just for development, remove later
questioniarRouter.post("/questioniar", createQuizz);

export default questioniarRouter;
