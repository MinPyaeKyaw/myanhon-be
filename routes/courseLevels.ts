import express from "express";
import { verifyUserJwt } from "../middlewares/userJwtMiddleware";
import { createLevel, getLevels } from "../controllers/levelController";
import { apiKeyMiddleware } from "../middlewares/apiKeyMiddleware";

const levelRouter = express.Router();

levelRouter.get("/levels", apiKeyMiddleware, verifyUserJwt, getLevels);

// just for development, remove later
levelRouter.post("/level", createLevel);

export default levelRouter;
