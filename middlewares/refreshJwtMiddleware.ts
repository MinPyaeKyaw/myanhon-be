import { type NextFunction, type Request, type Response } from 'express'

import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'

import { getJwtTokenFromReq, logError, writeJsonRes } from '../utils/functions'

const prisma: PrismaClient = new PrismaClient()

export const refreshJwtMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = getJwtTokenFromReq(req.headers.authorization)
    if (!token) {
      return writeJsonRes<null>(res, 401, null, 'Unthorizied access!')
    }

    jwt.verify(
      token,
      process.env.JWT_REFRESH_SECRET as string,
      async (err, decodedToken: any) => {
        if (err) {
          return writeJsonRes<null>(res, 401, null, 'Unthorizied access!')
        }

        if (!decodedToken.id) {
          return writeJsonRes<null>(res, 401, null, 'Unthorizied access!')
        }

        const user = await prisma.users.findFirst({
          where: {
            id: decodedToken.id,
          },
        })

        if (!user) {
          return writeJsonRes<null>(res, 401, null, 'Invalid token!')
        }

        next()
      },
    )
  } catch (error) {
    logError(error, 'Verify User JWT Middleware')
    return writeJsonRes<null>(res, 500, null, 'Internal Server Error!')
  }
}
