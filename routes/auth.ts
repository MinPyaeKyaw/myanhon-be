import express, {Request, Response} from "express";
import { PrismaClient } from '@prisma/client'

const authRouter = express.Router();
const prisma: PrismaClient = new PrismaClient();

authRouter.post('/login', (req: Request, res: Response) => {
    res.status(200).json({
        statusCode: 200,
        data: {
            name: "Sai Min Pyae Kyaw",
            email: "saiminpyaekyaw@gmail.com"
        },
        message: "Successfully retrived!"
    })
})

authRouter.post('/signup', (req: Request, res: Response) => {
    res.send("Signup")
})

authRouter.post('/forgot-password', (req: Request, res: Response) => {
    res.send("Forgot password")
})

export default authRouter;