import express, {Application} from "express";
import authRouter from "./routes/auth";

const app: Application = express();

app.use(express.json());
app.use('/auth', authRouter);

app.listen(4000, () => {
    console.log("now listening to 4000");
})

export default app;