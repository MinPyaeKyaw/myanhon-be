import { Request, Response } from "express";

import { PrismaClient } from "@prisma/client";

import { logError, writeJsonRes } from "../utils/functions";
import { SuggestionResInterface } from "../utils/interfaces";

const prisma: PrismaClient = new PrismaClient();

export const submitSuggestion = async (req: Request, res: Response) => {
  try {
    const suggestion = await prisma.suggestion.create({
      data: {
        title: req.body.title,
        suggestion: req.body.suggestion,
      },
    });

    return writeJsonRes<SuggestionResInterface>(
      res,
      201,
      suggestion,
      "Successfully submitted!"
    );
  } catch (error) {
    logError(error, "Post Suggestion Controller");
    return writeJsonRes<null>(res, 500, null, "Internal Server Error!");
  }
};
