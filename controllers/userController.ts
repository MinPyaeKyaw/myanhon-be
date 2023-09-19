import { type Request, type Response } from 'express'

import { PrismaClient } from '@prisma/client'

import { getJwtToken, logError, writeJsonRes } from '../utils/functions'
import {
  type UserResInterface,
  type TokenResInterface,
} from '../utils/interfaces'

const prisma: PrismaClient = new PrismaClient()

export const editUserById = async (req: Request, res: Response) => {
  try {
    const editedUser = await prisma.users.update({
      where: {
        id: req.params.id,
      },
      data: {
        name: req.body.name,
        email: req.body.email,
      },
    })

    const tokenData = {
      id: editedUser.id,
      name: editedUser.name,
      email: editedUser.email,
      phone: editedUser.phone,
      isPaid: editedUser.isPaid,
      startDate: editedUser.startDate,
      expiredDate: editedUser.expiredDate,
    }

    const refreshTokenData = {
      id: editedUser?.id,
    }

    return writeJsonRes<TokenResInterface>(
      res,
      200,
      {
        accessToken: getJwtToken(
          tokenData,
          `${process.env.JWT_USER_SECRET}`,
          `${process.env.JWT_USER_EXP}`,
        ),
        refreshToken: getJwtToken(
          refreshTokenData,
          `${process.env.JWT_REFRESH_SECRET}`,
          `${process.env.JWT_REFRESH_EXP}`,
        ),
      },
      'Successfully edited your info!',
    )
  } catch (error) {
    logError(error, 'Edit User Controller')
    return writeJsonRes<null>(res, 500, null, 'Internal Server Error!')
  }
}

export const changePhoneNumber = async (req: Request, res: Response) => {
  try {
    const updatedUser = await prisma.users.update({
      where: {
        id: req.params.id,
      },
      data: {
        phone: req.body.phone,
      },
    })

    return writeJsonRes<UserResInterface>(
      res,
      200,
      updatedUser,
      'Internal Server Error!',
    )
  } catch (error) {
    logError(error, 'Change Phone Controller')
    return writeJsonRes<null>(res, 500, null, 'Internal Server Error!')
  }
}
