import { type Request, type Response } from 'express'

import { PrismaClient } from '@prisma/client'

import {
  generateOTPCode,
  getJwtToken,
  hashPassword,
  logError,
  refreshVerificationCode,
  verifyPassword,
  writeJsonRes,
} from '../utils/functions'
import mailer from '../utils/nodeMailerFn'
import { type TokenResInterface } from '../utils/interfaces'
import { JWT_TYPES } from '../utils/enums'

const prisma: PrismaClient = new PrismaClient()

export const test = async (req: Request, res: Response) => {
  // try {
  //     const user = await prisma.users.findFirst({
  //         where: {
  //             email: req.body.email
  //         }
  //     })
  //     console.log('USER', user);
  //     if(!user) {
  //         console.log('NOT FOUND USER', user);
  //         return writeJsonRes<null>(res, 404, null, "This email hasn't been registered yet!");
  //     }
  //     let lee = await verifyPassword(req.body.password, user.password)
  //     return writeJsonRes<any>(res, 404, {lee: lee}, "This email hasn't been registered yet!");
  // } catch (error) {
  //     console.log("LEE PL", error)
  //     return writeJsonRes<null>(res, 500, null, "Internal Server Error!")
  // }
  // logger();
}

export const refreshToken = (req: Request, res: Response) => {
  try {
    const accessTokenData = {
      id: 'leepl',
      name: 'leepl',
      email: 'leepl',
      phone: 'leepl',
      isPaid: 'leepl',
      startDate: 'leepl',
      expiredDate: 'leepl',
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
        accessToken: getJwtToken(accessTokenData, JWT_TYPES.ACCESS),
        refreshToken: getJwtToken(refreshTokenData, JWT_TYPES.REFRESH),
      },
      'Successfully logged in!',
    )
  } catch (error) {
    logError(error, 'Refresh token Controller')
    return writeJsonRes<null>(res, 500, null, 'Internal Server Error!')
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const user = await prisma.users.findFirst({
      where: {
        email: req.body.email,
      },
    })

    if (!user) {
      return writeJsonRes<null>(
        res,
        404,
        null,
        "This email hasn't been registered yet!",
      )
    }

    const isVerifiedPassword = await verifyPassword(
      req.body.password,
      user.password,
    )
    if (!isVerifiedPassword) {
      return writeJsonRes<null>(res, 400, null, 'Invalid password!')
    }

    if (!user.isEmailVerified) {
      const otpCode = generateOTPCode()
      //   mailer({
      //     to: req.body.email,
      //     subject: 'Verify your email!',
      //     html: otpCode
      //   })
      return writeJsonRes<null>(res, 400, null, 'Verify your email!')
    }

    const tokenData = {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      isPaid: user.isPaid,
      startDate: user.startDate,
      expiredDate: user.expiredDate,
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
    logError(error, 'Login Controller')
    return writeJsonRes<null>(res, 500, null, 'Internal Server Error!')
  }
}

export const signup = async (req: Request, res: Response) => {
  try {
    const duplicatedEmail = await prisma.users.findFirst({
      where: {
        email: req.body.email,
      },
    })
    if (duplicatedEmail) {
      return writeJsonRes<null>(res, 409, null, 'This email is already used!')
    }

    const otpCode = generateOTPCode()
    const hashedPassword = await hashPassword(req.body.password)
    const createdUser = await prisma.users.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: hashedPassword,
        verificationCode: otpCode,
      },
    })

    if (createdUser) {
      //   mailer({
      //     to: req.body.email,
      //     subject: 'Verify your email!',
      //     html: otpCode
      //   })
    }

    return writeJsonRes<null>(
      res,
      201,
      null,
      'Successfully created your account!',
    )
  } catch (error) {
    logError(error, 'Sign Up Controller')
    return writeJsonRes<null>(res, 500, null, 'Internal Server Error!')
  }
}

export const verifyEmail = async (req: Request, res: Response) => {
  try {
    const user = await prisma.users.findFirst({
      where: {
        email: req.body.email,
      },
    })
    if (!user) {
      return writeJsonRes<null>(
        res,
        400,
        null,
        "This email hasn't been registered yet!",
      )
    }

    if (req.body?.verificationCode !== user?.verificationCode) {
      return writeJsonRes<null>(res, 400, null, 'Invalid verification code')
    }

    await prisma.users.update({
      where: {
        email: req.body.email,
      },
      data: {
        isEmailVerified: true,
      },
    })

    await refreshVerificationCode(req.body.email)

    const tokenData = {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      isPaid: user.isPaid,
      startDate: user.startDate,
      expiredDate: user.expiredDate,
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
      'Successfully verified your email!',
    )
  } catch (error) {
    logError(error, 'Email Verify Controller')
    return writeJsonRes<null>(res, 500, null, 'Internal Server Error!')
  }
}

export const checkEmail = async (req: Request, res: Response) => {
  try {
    const user = await prisma.users.findFirst({
      where: {
        email: req.body.email,
      },
    })

    if (!user) {
      return writeJsonRes<null>(
        res,
        404,
        null,
        "This email hasn't been registered yet!",
      )
    }

    return writeJsonRes<null>(res, 200, null, 'Verify your email!')
  } catch (error) {
    logError(error, 'Check Email Controller')
    return writeJsonRes<null>(res, 500, null, 'Internal Server Error!')
  }
}

export const verifyCode = async (req: Request, res: Response) => {
  try {
    const user = await prisma.users.findFirst({
      where: {
        email: req.body.email,
      },
    })

    if (user?.verificationCode !== req.body.verificationCode) {
      return writeJsonRes<null>(res, 400, null, 'Invalid verification code')
    }

    await refreshVerificationCode(req.body.email)

    const tokenData = {
      email: req.body.email,
      code: req.body.verificationCode,
      resetPasswordToken: true,
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
        accessToken: getJwtToken(tokenData, JWT_TYPES.RESET_PASSWORD),
        refreshToken: getJwtToken(refreshTokenData, JWT_TYPES.REFRESH),
      },
      'Successfully verified!',
    )
  } catch (error) {
    logError(error, 'Verfiy Code Controller')
    return writeJsonRes<null>(res, 500, null, 'Internal Server Error!')
  }
}

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const hashedPassword = await hashPassword(req.body.newPassword)
    await prisma.users.update({
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
