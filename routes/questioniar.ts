import express from "express";
import {
  createQuizz,
  getQuizz,
  submitQuestioniar,
} from "../controllers/questioniar";

const questioniarRouter = express.Router();

questioniarRouter.get("/questioniars", getQuizz);

questioniarRouter.post("/questioniar-submit", submitQuestioniar);

questioniarRouter.post("/questioniar", createQuizz);

export default questioniarRouter;
