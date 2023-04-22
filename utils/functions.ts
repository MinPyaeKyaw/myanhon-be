import * as express from "express"
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';
import jwt, { sign } from "jsonwebtoken";

export const writeJsonRes = <ResDataType>(res: express.Response, status:number, data:ResDataType, message:string) => {
    return res.status(status)
    .json({
        status: status,
        message: message,
        data: data
    })
    .end();
}

export const generateOTPCode = ():string => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 6; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return result.toUpperCase();
}

export const refreshVerificationCode = async (email: string) => {
    const prisma: PrismaClient = new PrismaClient();
    
    try {
        const newCode = generateOTPCode();
        const updateCode = await prisma.users.update({
            where: {
                email: email
            },
            data: {
                verificationCode: newCode
            }
        })

        if(updateCode) {
            return true
        }
    } catch (error) {
        return false
    }
}

export const hashPassword = async (password: string):Promise<string> => {
    return await bcrypt.hash(password, 10);
}

export const verifyPassword = async (userPassword:string, dbPassword:string):Promise<boolean> => {
    return await bcrypt.compare(userPassword, dbPassword)
    .then((res) => {
        return res;
    })
    .catch((err) => {
        return false;
    });
}

export const getJwtToken = (data:any, secret:string):string => {
    let token = jwt.sign(data, secret);

    return token;
}