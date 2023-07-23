import { Request, Response } from "express";

import { PrismaClient } from "@prisma/client";

import { logError, writeJsonRes } from "../utils/functions";
import { QuestioniarResInterface } from "../utils/interfaces";

const prisma: PrismaClient = new PrismaClient();

export const getQuizz = async (req: Request, res: Response) => {
  try {
    const quizz = await prisma.questioniarsQuizz.findMany({
      include: {
        answers: true,
      },
    });

    return writeJsonRes<QuestioniarResInterface[]>(
      res,
      200,
      quizz,
      "Successfully retrived!"
    );
  } catch (error) {
    logError(error, "Get Questioniar Controller");
    return writeJsonRes<null>(res, 500, null, "Internal Server Error!");
  }
};

export const submitQuestioniar = async (req: Request, res: Response) => {
  try {
    let promises: any = [];

    req.body.payload.forEach(async (answer: string) => {
      const oldCount = await prisma.questioniarAnswer.findFirst({
        where: { id: answer },
      });

      if (oldCount) {
        const updateCount = await prisma.questioniarAnswer.update({
          where: { id: answer },
          data: {
            count: oldCount?.count + 1,
          },
        });
        promises.push(updateCount);
      }
    });

    Promise.all(promises).then((result) => {
      return writeJsonRes<null>(res, 200, null, "Successfully submitted!");
    });
  } catch (error) {
    logError(error, "Submit Questioniar Controller");
    return writeJsonRes<null>(res, 500, null, "Internal Server Error!");
  }
};

export const createQuizz = async (req: Request, res: Response) => {
  try {
    const quizz = await prisma.questioniarsQuizz.create({
      data: {
        question: req.body.question,
        answers: {
          create: req.body.answers.map((a: string) => ({
            answer: a,
            count: 0,
          })),
        },
      },
    });

    return writeJsonRes<any>(res, 200, quizz, "Good Good!");
  } catch (error) {
    logError(error, "Get Questioniar Controller");
    return writeJsonRes<null>(res, 500, null, "Internal Server Error!");
  }
};
