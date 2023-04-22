import express from "express";
import { createType, getTypes } from "../controllers/typeController";
import { verifyUserJwt } from "../middlewares/userJwtMiddleware";

const typeRouter = express.Router();

typeRouter.get('/types', verifyUserJwt, getTypes);

typeRouter.post('/type', createType);

export default typeRouter;