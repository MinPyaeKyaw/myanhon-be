import express, {Application} from "express";

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

dotenv.config({ path: __dirname+'/.env' });
dotenv.config();

const app: Application = express();
app.use(express.json());

// Admin routes
let adminAPIPrefix: string = process.env.API_PREFIX + '/admin';
app.use(adminAPIPrefix+'/auth', adminAuthRoute);
app.use(adminAPIPrefix, roleRoutes);
app.use(adminAPIPrefix, permissionRoutes);
app.use(adminAPIPrefix, adminRoutes);

// User routes
app.use(process.env.API_PREFIX+'/auth', authRouter);
app.use(`${process.env.API_PREFIX}`, courseRouter);
app.use(`${process.env.API_PREFIX}`, typeRouter);
app.use(`${process.env.API_PREFIX}`, levelRouter);
app.use(`${process.env.API_PREFIX}`, userRouter);

app.listen(4000, () => {
    console.log("now listening to 4000");
})

export default app;