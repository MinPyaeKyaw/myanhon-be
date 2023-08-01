import express from "express";
import { createType, getTypes } from "../controllers/typeController";
import { verifyUserJwt } from "../middlewares/userJwtMiddleware";
import { apiKeyMiddleware } from "../middlewares/apiKeyMiddleware";

const typeRouter = express.Router();

typeRouter.get("/types", apiKeyMiddleware, getTypes);

typeRouter.post("/type", createType);

export default typeRouter;
