import { type Request, type Response } from 'express'

import { PrismaClient } from '@prisma/client'

import { writeJsonRes } from '../utils/functions'

const prisma: PrismaClient = new PrismaClient()

export const setContentTracking = async (req: Request, res: Response) => {
  try {
    const existedTracking = await prisma.contentTracking.findFirst({
      where: {
        userId: req.body.userId,
        contentId: req.body.contentId,
      },
    })
    if (existedTracking) {
      const updatedContentTracking = await prisma.contentTracking.update({
        where: {
          id: existedTracking.id,
        },
        data: {
          completedPercent: req.body.completedPercent,
        },
      })
      return writeJsonRes<any>(
        res,
        200,
        updatedContentTracking,
        'Successfully created!',
      )
    }

    const createdContentTracking = await prisma.contentTracking.create({
      data: {
        userId: req.body.userId,
        contentId: req.body.contentId,
        completedPercent: req.body.completedPercent,
      },
    })

    return writeJsonRes<any>(
      res,
      200,
      createdContentTracking,
      'Successfully created!',
    )
  } catch (error) {
    console.log('CREATE CONTENT TRACk ERROR', error)
    return writeJsonRes<null>(res, 500, null, 'Internal Server Error!')
  }
}

export const setTestTracking = async (req: Request, res: Response) => {
  try {
    const existedTestTracking = await prisma.testTracking.findFirst({
      where: {
        userId: req.body.userId,
        testId: req.body.testId,
      },
    })
    if (existedTestTracking) {
      const updatedTestTracking = await prisma.testTracking.update({
        where: {
          id: existedTestTracking.id,
        },
        data: {
          score: req.body.score,
        },
      })
      return writeJsonRes<any>(
        res,
        200,
        updatedTestTracking,
        'Successfully created!',
      )
    }

    const createdTestTracking = await prisma.testTracking.create({
      data: {
        userId: req.body.userId,
        testId: req.body.testId,
        score: req.body.score,
      },
    })

    return writeJsonRes<any>(
      res,
      200,
      createdTestTracking,
      'Successfully created!',
    )
  } catch (error) {
    console.log('CREATE TEST TRACk ERROR', error)
    return writeJsonRes<null>(res, 500, null, 'Internal Server Error!')
  }
}
