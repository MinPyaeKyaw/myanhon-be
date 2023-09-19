import { type NextFunction, type Request, type Response } from 'express'

import { PrismaClient } from '@prisma/client'

import {
  decodeJWT,
  getJwtTokenFromReq,
  logError,
  writeJsonRes,
} from '../../utils/functions'

const prisma: PrismaClient = new PrismaClient()

export const userEditProfilePolicy = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = getJwtTokenFromReq(req.headers.authorization)
    if (!token) {
      return writeJsonRes<null>(res, 401, null, 'Unthorizied access!')
    }
    const decodedToken: any = decodeJWT(token)
    if (decodedToken?.id !== req.params.id) {
      return writeJsonRes<null>(res, 401, null, 'Unthorizied access!')
    }

    const user = await prisma.users.findUnique({
      where: {
        id: req.params.id,
      },
    })
    if (!user) {
      return writeJsonRes(res, 404, null, 'User not found!')
    }

    next()
  } catch (error) {
    logError(error, 'User Edit Profile Policy')
    return writeJsonRes<null>(res, 500, null, 'Internal Server Error!')
  }
}

export const userChangePhonePolicy = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = getJwtTokenFromReq(req.headers.authorization)
    if (!token) {
      return writeJsonRes<null>(res, 401, null, 'Unthorizied access!')
    }
    const decodedToken: any = decodeJWT(token)
    if (decodedToken?.id !== req.params.id) {
      return writeJsonRes<null>(res, 401, null, 'Unthorizied access!')
    }

    const existedPhone = await prisma.users.findFirst({
      where: {
        phone: req.body.phone,
      },
    })
    if (existedPhone) {
      return writeJsonRes<null>(
        res,
        400,
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
