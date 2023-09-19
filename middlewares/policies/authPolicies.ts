import { type NextFunction, type Request, type Response } from 'express'

import { PrismaClient } from '@prisma/client'

import { logError, writeJsonRes } from '../../utils/functions'

const prisma: PrismaClient = new PrismaClient()

export const signupPolicy = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const duplicatedPhone = await prisma.users.findFirst({
      where: {
        phone: req.body.phone,
      },
    })
    if (duplicatedPhone) {
      return writeJsonRes<null>(
        res,
        409,
        null,
        'This phone number is already used!',
      )
    }

    next()
  } catch (error) {
    logError(error, 'User Edit Profile Policy')
    return writeJsonRes<null>(res, 500, null, 'Internal Server Error!')
  }
}
