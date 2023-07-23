import express from "express";
import { pay } from "../../controllers/payment/payment";

const paymentRouter = express.Router();

paymentRouter.post("/pay", pay);

export default paymentRouter;
