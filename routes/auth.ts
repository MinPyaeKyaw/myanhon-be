import express from "express";
import {
  checkEmail,
  login,
  resetPassword,
  signup,
  verifyEmail,
  verifyCode,
  test,
} from "../controllers/authController";
import { verifyResetPasswordJwt } from "../middlewares/resetPasswordJwtMiddleware";
import { apiKeyMiddleware } from "../middlewares/apiKeyMiddleware";

const authRouter = express.Router();

authRouter.post("/login", apiKeyMiddleware, login);

authRouter.post("/signup", apiKeyMiddleware, signup);

authRouter.post("/verify-email", apiKeyMiddleware, verifyEmail);

authRouter.post("/check-email", apiKeyMiddleware, checkEmail);

authRouter.post("/verify-code", apiKeyMiddleware, verifyCode);

authRouter.patch(
  "/reset-password",
  apiKeyMiddleware,
  verifyResetPasswordJwt,
  resetPassword
);

authRouter.post("/test", verifyResetPasswordJwt, test);

export default authRouter;
