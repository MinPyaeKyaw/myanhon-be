import express from "express";
import { pay } from "../../controllers/payment/payment";
import { apiKeyMiddleware } from "../../middlewares/apiKeyMiddleware";

const paymentRouter = express.Router();

paymentRouter.post("/pay", apiKeyMiddleware, pay);

export default paymentRouter;
