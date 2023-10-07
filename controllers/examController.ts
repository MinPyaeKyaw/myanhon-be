import { type Request, type Response } from 'express'

import { PrismaClient } from '@prisma/client'

import {
  calculateExamResultStatus,
  getRequestedUser,
  // calculatePercentage,
  logError,
  // shuffleExamQuestions,
  writeJsonRes,
} from '../utils/functions'
import {
  type sectionResultQuery,
  type ExamSectionResultResInterface,
  type examResultResInterface,
} from '../utils/interfaces'

const prisma: PrismaClient = new PrismaClient()

export const getExam = async (req: Request, res: Response) => {
  try {
    const exam = await prisma.exam.findFirst({
      where: {
        typeId: req.query.type as string,
        levelId: req.query.level as string,
      },
      include: {
        sections: true,
      },
    })

    return writeJsonRes<any>(res, 200, exam, 'Successfully retrived!')
  } catch (error) {
    logError(error, 'Get Exam Controller')
    return writeJsonRes<null>(res, 500, null, 'Internal Server Error!')
  }
}

export const getQuestionsBySection = async (req: Request, res: Response) => {
  try {
    const section = await prisma.examSection.findUnique({
      where: {
        id: req.params.sectionId,
      },
      include: {
        questions: {
          take: req.query.questionCount ? +req.query.questionCount : 10,
          include: {
            answers: {
              select: {
                id: true,
                answer: true,
              },
            },
          },
        },
      },
    })

    return writeJsonRes<any>(res, 200, section, 'Successfully retrived!')
  } catch (error) {
    logError(error, 'Get Sections Controller')
    return writeJsonRes<null>(res, 500, null, 'Internal Server Error!')
  }
}

export const test = async (req: Request, res: Response) => {
  try {
    const requestedUser = getRequestedUser(req)

    res.json(requestedUser)
  } catch (error) {
    console.log(error)
  }
}

export const submitExam = async (req: Request, res: Response) => {
  try {
    const requestedUser = getRequestedUser(req)

    // getting id lists of sections, questions, and answers from request
    const sectionIds: string[] = []
    const questionIds: string[] = []
    const answerIds: string[] = []
    req.body.sections.forEach((section: any) => {
      sectionIds.push(section.sectionId)
      section.questions.forEach((question: any) => {
        answerIds.push(question.answerId)
        questionIds.push(question.questionId)
      })
    })

    const sectionsWithAnswers = await prisma.examSection.findMany({
      where: {
        id: {
          in: sectionIds,
        },
      },
      include: {
        questions: {
          where: {
            id: { in: questionIds },
          },
          include: {
            answers: {
              where: {
                id: { in: answerIds },
              },
              select: {
                id: true,
                isCorrect: true,
              },
            },
          },
        },
      },
    })

    // getting user score of specific sections
    const sectionResults: ExamSectionResultResInterface[] = []
    sectionsWithAnswers.forEach((section: any) => {
      let userScore: number = 0
      section.questions.forEach((question: any) => {
        if (question.answers[0].isCorrect) {
          userScore++
        }
      })
      sectionResults.push({
        sectionId: section.id,
        totalScore: section.totalScore,
        requiredMinScore: section.requiredMinScore,
        userScore,
      })
    })

    // getting query to store exam and related section results
    let examUserScore: number = 0
    const sectionResultQuery: sectionResultQuery[] = []
    sectionResults.forEach((sectionResult: ExamSectionResultResInterface) => {
      examUserScore += sectionResult.userScore
      sectionResultQuery.push({
        userScore: sectionResult.userScore,
        sectionId: sectionResult.sectionId,
        status: calculateExamResultStatus(
          sectionResult.totalScore,
          sectionResult.userScore,
        ),
      })
    })
    const exam = await prisma.exam.findFirst({
      where: {
        id: req.body.examId,
      },
      include: {
        type: true,
        level: true,
      },
    })
    const examResultQuery = {
      data: {
        totalScore: exam?.totalScore || 0,
        requiredMinScore: exam?.requiredMinScore || 0,
        userScore: examUserScore,
        levelId: exam?.levelId ?? '',
        typeId: exam?.typeId ?? '',
        status: calculateExamResultStatus(exam?.totalScore, examUserScore),
        userId: requestedUser.id,
        sections: {
          create: sectionResultQuery,
        },
      },
      include: {
        sections: true,
      },
    }

    // storing exam result by user
    const examResult = await prisma.userExamResult.create(examResultQuery)

    return writeJsonRes<examResultResInterface>(
      res,
      200,
      examResult,
      'Successfully submitted!',
    )
  } catch (error) {
    logError(error, 'Submit Exam Controller')
    return writeJsonRes<null>(res, 500, null, 'Internal Server Error!')
  }
}

export const getExamResultsByUser = async (req: Request, res: Response) => {
  try {
    const examResultByUser = await prisma.userExamResult.findMany({
      where: {
        userId: req.params.userId,
      },
      include: {
        sections: {
          include: {
            section: true,
          },
        },
        level: true,
        type: true,
      },
    })

    return writeJsonRes<any>(
      res,
      500,
      examResultByUser,
      'Successfully retrived!',
    )
  } catch (error) {
    logError(error, 'Get Exam Result By User Controller')
    return writeJsonRes<null>(res, 500, null, 'Internal Server Error!')
  }
}

// for development, remove later
export const createExam = async (req: Request, res: Response) => {
  try {
    const exam = await prisma.exam.create({
      data: {
        totalScore: req.body.totalScore,
        requiredMinScore: req.body.requiredMinScore,
        duration: req.body.duration,
        typeId: req.body.typeId,
        levelId: req.body.levelId,
      },
    })

    return writeJsonRes<any>(res, 500, exam, 'Successfully created!')
  } catch (error) {
    logError(error, 'Create Exam Controller')
    return writeJsonRes<null>(res, 500, null, 'Internal Server Error!')
  }
}

export const createSection = async (req: Request, res: Response) => {
  try {
    const section = await prisma.examSection.create({
      data: {
        name: req.body.name,
        questionCount: req.body.questionCount,
        requiredMinScore: req.body.requiredMinScore,
        totalScore: req.body.totalScore,
        duration: req.body.duration,
        examId: req.body.examId,
      },
    })

    return writeJsonRes<any>(res, 500, section, 'Successfully created!')
  } catch (error) {
    logError(error, 'Create Section Controller')
    return writeJsonRes<null>(res, 500, null, 'Internal Server Error!')
  }
}

export const createExamType = async (req: Request, res: Response) => {
  try {
    const examType = await prisma.examType.create({
      data: {
        name: req.body.name,
      },
    })

    return writeJsonRes<any>(res, 201, examType, 'Successfully created!')
  } catch (error) {
    logError(error, 'Create Exam Type Controller')
    return writeJsonRes<null>(res, 500, null, 'Internal Server Error!')
  }
}

export const createQuestion = async (req: Request, res: Response) => {
  try {
    const question = await prisma.examQuestion.create({
      data: {
        question: req.body.question,
        sectionId: req.body.sectionId,
      },
    })

    return writeJsonRes<any>(res, 201, question, 'Successfully created!')
  } catch (error) {
    logError(error, 'Create Queston Controller')
    return writeJsonRes<null>(res, 500, null, 'Internal Server Error!')
  }
}

export const createAnswer = async (req: Request, res: Response) => {
  try {
    const answer = await prisma.examAnswer.create({
      data: {
        answer: req.body.answer,
        isCorrect: req.body.isCorrect,
        questionId: req.body.questionId,
      },
    })

    return writeJsonRes<any>(res, 201, answer, 'Successfully created!')
  } catch (error) {
    logError(error, 'Create Answer Controller')
    return writeJsonRes<null>(res, 500, null, 'Internal Server Error!')
  }
}
