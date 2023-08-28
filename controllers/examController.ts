import { type Request, type Response } from 'express'

import { PrismaClient } from '@prisma/client'

import { calculatePercentage, logError, writeJsonRes } from '../utils/functions'
import { type ExamSectionResInterface } from '../utils/interfaces'

const prisma: PrismaClient = new PrismaClient()

export const getExam = async (req: Request, res: Response) => {
  try {
    const sections = await prisma.examSection.findMany({
      include: {
        questions: {
          include: { answers: true },
        },
      },
      where: {
        examId: req.params.type,
        levelId: req.params.level,
      },
    })

    return writeJsonRes<ExamSectionResInterface[]>(
      res,
      200,
      sections,
      'Successfully retrived!',
    )
  } catch (error) {
    logError(error, 'Get Exam Controller')
    return writeJsonRes<null>(res, 500, null, 'Internal Server Error!')
  }
}

export const submitExam = async (req: Request, res: Response) => {
  try {
    const reqPayload = {
      userId: 'ca7ae16b-fae4-4c7a-a158-a4735ef31978',
      examId: 'c0551fbd-7370-402d-b395-e060a058bfa1',
      levelId: '0df2038f-a8d1-48bd-86fc-f66d2ff39c65',
      sections: [
        {
          id: '131468eb-8035-42e4-ac27-a9119abe1bcc',
          questionCount: 2,
          questions: [
            {
              id: '444d3319-023c-40dc-95a8-cfd40f6d1142',
              answerId: '7dfa3af7-4a43-4dd3-a069-eba6b3f7e3a9',
            },
            {
              id: '167088a2-c43c-4975-9c20-1e78b3aa71ca',
              answerId: '0a1cb481-1abd-43c1-9a4b-cd40e4a21444',
            },
          ],
        },
        {
          id: 'd6084289-2588-44de-b159-0435a793827f',
          questionCount: 2,
          questions: [
            {
              id: '0765bbdd-1e3c-4788-914b-8a7c0ba11f1b',
              answerId: 'b1c14de0-0fbd-4c54-a79d-7454b191fc0c',
            },
            {
              id: 'ea0b5aec-3cc2-42de-aad0-f3af95b563b6',
              answerId: '5bf736b8-3a83-4362-bd86-6629b2f0ac87',
            },
          ],
        },
      ],
    }

    const sectionIds: string[] = []
    const questionIds: string[] = []
    const answerIds: string[] = []
    let totalScore: number = 0 // total score of exam for res

    reqPayload.sections.forEach(section => {
      sectionIds.push(section.id)
      section.questions.forEach(question => {
        questionIds.push(question.id)
        answerIds.push(question.answerId)
      })

      totalScore += section.questionCount
    })

    const sections = await prisma.examSection.findMany({
      where: {
        id: { in: sectionIds },
      },
      include: {
        questions: {
          where: {
            id: { in: questionIds },
          },
          include: {
            answers: {
              where: { id: { in: answerIds } },
            },
          },
        },
      },
    })

    const sectionResults: any = []
    let userScore: number = 0 // user score of exam for res
    sections.forEach(section => {
      const tempResult = {
        section: section.name,
        result: 0,
        totalScore: section.questions.length,
      }

      const reqQuestionCount = reqPayload.sections.filter(
        s => s.id === section.id,
      )[0].questionCount

      let correctAnswerCount = 0
      section.questions.forEach(question => {
        if (question.answers[0]?.isCorrect) {
          correctAnswerCount += 1
          userScore += 1
        }
      })

      tempResult.result = calculatePercentage(
        correctAnswerCount,
        reqQuestionCount,
      )

      sectionResults.push(tempResult)
    })

    const result = {
      result: userScore,
      totalScore,
      sectionResults,
    }

    await prisma.examResult.create({
      data: {
        result,
        examId: reqPayload.examId,
        levelId: reqPayload.levelId,
        userId: reqPayload.userId,
      },
    })

    return writeJsonRes<any>(res, 200, result, 'Successfully retrived!')
  } catch (error) {
    logError(error, 'Submit Exam Controller')
    return writeJsonRes<null>(res, 500, null, 'Internal Server Error!')
  }
}

// for development, remove later
export const createExam = async (req: Request, res: Response) => {
  try {
    await prisma.exam.create({
      data: {
        name: req.body.name,
        duration: req.body.duration,
      },
    })

    return writeJsonRes<string>(res, 201, 'created', 'Successfully created!')
  } catch (error) {
    logError(error, 'Create Exam Controller')
    return writeJsonRes<null>(res, 500, null, 'Internal Server Error!')
  }
}

export const createSection = async (req: Request, res: Response) => {
  try {
    await prisma.examSection.create({
      data: {
        name: req.body.name,
        examId: req.body.examId,
        levelId: req.body.levelId,
      },
    })

    return writeJsonRes<string>(res, 201, 'created', 'Successfully created!')
  } catch (error) {
    logError(error, 'Create Section Controller')
    return writeJsonRes<null>(res, 500, null, 'Internal Server Error!')
  }
}

export const createQuestion = async (req: Request, res: Response) => {
  try {
    await prisma.examQuestion.create({
      data: {
        question: req.body.question,
        sectionId: req.body.sectionId,
      },
    })

    return writeJsonRes<string>(res, 201, 'created', 'Successfully created!')
  } catch (error) {
    logError(error, 'Create Queston Controller')
    return writeJsonRes<null>(res, 500, null, 'Internal Server Error!')
  }
}

export const createAnswer = async (req: Request, res: Response) => {
  try {
    await prisma.examAnswer.create({
      data: {
        answer: req.body.answer,
        isCorrect: req.body.isCorrect,
        questionId: req.body.questionId,
      },
    })

    return writeJsonRes<string>(res, 201, 'created', 'Successfully created!')
  } catch (error) {
    logError(error, 'Create Queston Controller')
    return writeJsonRes<null>(res, 500, null, 'Internal Server Error!')
  }
}
