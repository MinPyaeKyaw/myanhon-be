import { type Request, type Response } from 'express'

import { PrismaClient } from '@prisma/client'

import {
  getJwtToken,
  hashPassword,
  logError,
  updateAdminLoginCount,
  verifyPassword,
  writeJsonRes,
} from '../../utils/functions'
import mailer from '../../utils/nodeMailerFn'
import {
  type CreatedAdminResDataInterface,
  type TokenResInterface,
} from '../../utils/interfaces'
import dayjs from 'dayjs'
import { JWT_TYPES } from '../../utils/enums'

const prisma: PrismaClient = new PrismaClient()

export const test = (req: Request, res: Response) => {
  res.json({
    test: 'controller test',
  })
}

export const login = async (req: Request, res: Response) => {
  try {
    const admin = await prisma.admins.findFirst({
      where: {
        email: req.body.email,
      },
    })

    if (!admin) {
      return writeJsonRes<null>(
        res,
        404,
        null,
        "This email hasn't been registered yet!",
      )
    }

    if (
      dayjs(new Date()).diff(dayjs(admin.latestLogin), 'minute') < 30 &&
      // @ts-expect-error
      admin.loginTryCount > +process.env.ALLOWED_LOGIN_COUNT
    ) {
      return writeJsonRes<null>(
        res,
        400,
        null,
        `Try again after ${dayjs(admin.latestLogin).diff(
          dayjs(new Date()),
        )} minutes!`,
      )
    }

    const isVerifiedPassword = await verifyPassword(
      req.body.password,
      admin.password,
    )
    if (!isVerifiedPassword) {
      await updateAdminLoginCount(admin)
      return writeJsonRes<null>(res, 400, null, 'Invalid password!')
    }

    const tokenData = {
      id: admin.id,
      name: admin.name,
      email: admin.email,
      roleId: admin.roleId,
    }

    const refreshTokenData = {
      id: 'leepl',
      name: 'leepl',
      email: 'leepl',
      phone: 'leepl',
      isPaid: 'leepl',
      startDate: 'leepl',
      expiredDate: 'leepl',
    }

    return writeJsonRes<TokenResInterface>(
      res,
      200,
      {
        accessToken: getJwtToken(tokenData, JWT_TYPES.ACCESS),
        refreshToken: getJwtToken(refreshTokenData, JWT_TYPES.REFRESH),
      },
      'Successfully logged in!',
    )
  } catch (error) {
    logError(error, 'Create Admin Controller')
    return writeJsonRes<null>(res, 500, null, 'Internal Server Error!')
  }
}

export const createAdmin = async (req: Request, res: Response) => {
  try {
    const duplicatedEmail = await prisma.admins.findFirst({
      where: {
        email: req.body.email,
      },
    })
    if (duplicatedEmail) {
      return writeJsonRes<null>(res, 409, null, 'This email is already used!')
    }

    const hashedPassword = await hashPassword(req.body.password)
    const createdAdmin = await prisma.admins.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        roleId: req.body.roleId,
      },
    })

    return writeJsonRes<CreatedAdminResDataInterface>(
      res,
      201,
      {
        id: createdAdmin.id,
        name: createdAdmin.name,
        email: createdAdmin.email,
        createdAt: createdAdmin.createdAt,
        updatedAt: createdAdmin.updatedAt,
      },
      'Successfully created!',
    )
  } catch (error) {
    logError(error, 'Create Admin Controller')
    return writeJsonRes<null>(res, 500, null, 'Internal Server Error!')
  }
}

export const inviteAdmin = async (req: Request, res: Response) => {
  try {
    const admin = await prisma.admins.findFirst({
      where: {
        email: req.body.email,
      },
    })

    if (!admin) {
      return writeJsonRes<null>(res, 404, null, 'User not found!')
    }

    if (admin.hasLogin) {
      return writeJsonRes<null>(
        res,
        400,
        null,
        'This user has already been an admin!',
      )
    }

    mailer({
      to: req.body.email,
      subject: 'Invitation!',
      html: 'invitation template',
    })

    return writeJsonRes<null>(res, 200, null, 'Successfully sent invitation!')
  } catch (error) {
    logError(error, 'Invite Admin Controller')
    return writeJsonRes<null>(res, 500, null, 'Internal Server Error!')
  }
}

export const checkEmail = async (req: Request, res: Response) => {
  try {
    const admin = await prisma.admins.findFirst({
      where: {
        email: req.body.email,
      },
    })

    if (!admin) {
      return writeJsonRes<null>(
        res,
        404,
        null,
        "This email hasn't been registered yet!",
      )
    }

    return writeJsonRes<null>(res, 200, null, 'Verify your email!')
  } catch (error) {
    logError(error, 'Check Email Admin Controller')
    return writeJsonRes<null>(res, 500, null, 'Internal Server Error!')
  }
}

export const verfiyCode = async (req: Request, res: Response) => {
  try {
    const admin = await prisma.admins.findFirst({
      where: {
        email: req.body.email,
      },
    })

    if (admin?.verificationCode !== req.body.verificationCode) {
      return writeJsonRes<null>(res, 400, null, 'Invalid verification code')
    }

    const tokenData = {
      verificationCode: req.body.verificationCode,
      email: admin?.email,
      adminResetPasswordToken: true,
    }

    const refreshTokenData = {
      id: 'leepl',
      name: 'leepl',
      email: 'leepl',
      phone: 'leepl',
      isPaid: 'leepl',
      startDate: 'leepl',
      expiredDate: 'leepl',
    }

    return writeJsonRes<TokenResInterface>(
      res,
      200,
      {
        accessToken: getJwtToken(tokenData, JWT_TYPES.ACCESS),
        refreshToken: getJwtToken(refreshTokenData, JWT_TYPES.REFRESH),
      },
      'Successfully verified!',
    )
  } catch (error) {
    logError(error, 'Verify Code Admin Controller')
    return writeJsonRes<null>(res, 500, null, 'Internal Server Error!')
  }
}

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const hashedPassword = await hashPassword(req.body.newPassword)
    await prisma.admins.update({
      where: {
        email: req.body.email,
      },
      data: {
        password: hashedPassword,
      },
    })

    return writeJsonRes<null>(
      res,
      200,
      null,
      'Successfully changed your password!',
    )
  } catch (error) {
    logError(error, 'Reset Password Controller')
    return writeJsonRes<null>(res, 500, null, 'Internal Server Error!')
  }
}
