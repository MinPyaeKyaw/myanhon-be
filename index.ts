import express, {Express, Request, Response} from "express";
const app: Express = express();
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

console.log(prisma);

app.get('/', (req: Request, res: Response) => {
    res.send("Hello express with typescript!");
})

app.get('/hi', (req: Request, res: Response) => {
    res.send("Lee Pl");
})

app.listen(1337, () => {
    console.log("now listening to 1337");
})