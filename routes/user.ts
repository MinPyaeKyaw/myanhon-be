import express from "express";
import { verifyUserJwt } from "../middlewares/userJwtMiddleware";
import { editUserById, setUserTrack } from "../controllers/userController";
import { apiKeyMiddleware } from "../middlewares/apiKeyMiddleware";

const userRouter = express.Router();

userRouter.patch("/user/:id", apiKeyMiddleware, verifyUserJwt, editUserById);

userRouter.post("/user/:userId", apiKeyMiddleware, verifyUserJwt, setUserTrack);

export default userRouter;
