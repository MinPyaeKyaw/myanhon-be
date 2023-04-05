import {Request, Response} from "express";
import { response } from "../utils/functions";
import { LoginSuccessDataResponse } from "../utils/interfaces";

export const login = async (req:Request, res:Response) => {
    const data:LoginSuccessDataResponse = {
        id: "uuid",
        name: "Sai Min Pyae Kyaw",
        email: "saiminpyaekyaw@gmail.com",
        phone: "09899587877",
        photo: "saiminpyaekyaw.png",
        isPaid: true,
        startDate: "start date",
        endDate: "end date",
        token: "this is token"
    } 

    res.json(response<LoginSuccessDataResponse>(200, data, "Successfully logged in!"));
}