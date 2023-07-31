import express, { Application } from "express";

import * as dotenv from "dotenv";

import authRouter from "./routes/auth";
import courseRouter from "./routes/courses";
import typeRouter from "./routes/courseTypes";
import levelRouter from "./routes/courseLevels";
import userRouter from "./routes/user";
import adminAuthRoute from "./routes/admin/auth";
import roleRoutes from "./routes/admin/roles";
import permissionRoutes from "./routes/admin/permissions";
import adminRoutes from "./routes/admin/admins";
import adminCourseRoute from "./routes/admin/courses";
import paymentRouter from "./routes/payment/payment";
import questioniarRouter from "./routes/questioniar";
import suggestionRouter from "./routes/suggestoin";
import examRouter from "./routes/exam";

dotenv.config({ path: __dirname + "/.env" });
dotenv.config();

const app: Application = express();
app.use(express.json());

// Admin routes
let adminAPIPrefix: string = process.env.API_PREFIX + "/admin";
app.use(adminAPIPrefix + "/auth", adminAuthRoute);
app.use(adminAPIPrefix, roleRoutes);
app.use(adminAPIPrefix, permissionRoutes);
app.use(adminAPIPrefix, adminRoutes);
app.use(adminAPIPrefix, adminCourseRoute);

// User routes
app.use(process.env.API_PREFIX + "/auth", authRouter);
app.use(`${process.env.API_PREFIX}`, courseRouter);
app.use(`${process.env.API_PREFIX}`, typeRouter);
app.use(`${process.env.API_PREFIX}`, levelRouter);
app.use(`${process.env.API_PREFIX}`, userRouter);
app.use(`${process.env.API_PREFIX}`, paymentRouter);
app.use(`${process.env.API_PREFIX}`, questioniarRouter);
app.use(`${process.env.API_PREFIX}`, suggestionRouter);
app.use(`${process.env.API_PREFIX}`, examRouter);

app.listen(4000, () => {
  console.log("now listening to 4000");
});

export default app;
