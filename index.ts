import express, {Application} from "express";

import * as dotenv from "dotenv"

import authRouter from "./routes/auth";
import courseRouter from "./routes/courses";
import typeRouter from "./routes/courseTypes";
import levelRouter from "./routes/courseLevels";

dotenv.config({ path: __dirname+'/.env' });
dotenv.config();

const app: Application = express();
app.use(express.json());

app.use('/auth', authRouter);
app.use(courseRouter);
app.use(typeRouter);
app.use(levelRouter);

app.get('/', (req, res) => {
    res.send(process.env.JWT_USER_SECRET);
})

app.listen(4000, () => {
    console.log("now listening to 4000");
})

export default app;