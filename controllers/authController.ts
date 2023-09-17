import { type Request, type Response } from 'express'

import { PrismaClient } from '@prisma/client'

import {
  generateOTPCode,
  getJwtToken,
  getUsernameFromEmail,
  hashString,
  logError,
  refreshOTPCode,
  verifyString,
  writeJsonRes,
} from '../utils/functions'
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

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const user = await prisma.users.findFirst({
      where: { id: req.body.id },
    })

    const accessTokenData = {
      id: user?.id,
      name: user?.name,
      email: user?.email,
      phone: user?.phone,
      isPaid: user?.isPaid,
      startDate: user?.startDate,
      expiredDate: user?.expiredDate,
    }

    return writeJsonRes<any>(
      res,
      200,
      {
        accessToken: getJwtToken(accessTokenData, JWT_TYPES.ACCESS),
      },
      'Successfully refreshed the token!',
    )
  } catch (error) {
    logError(error, 'Refresh token Controller')
    return writeJsonRes<null>(res, 500, null, 'Internal Server Error!')
  }
}

export const sendOTP = async (req: Request, res: Response) => {
  try {
    const user = await prisma.users.findFirst({
      where: {
        phone: req.body.phone,
      },
    })

    if (!user) {
      return writeJsonRes<null>(
        res,
        404,
        null,
        "This phone number hasn't been registered yet!",
      )
    }

    // send otp to user via SMS message
    const otpCode = generateOTPCode()
    const hashedOtp = await hashString(otpCode)
    await refreshOTPCode(req.body.phone, hashedOtp)
    console.log('RESEND send otp to user via SMS message' + otpCode)

    const tokenData = {
      id: user.id,
    }
    return writeJsonRes<any>(
      res,
      200,
      {
        otpToken: getJwtToken(tokenData, JWT_TYPES.OTP),
      },
      'Successfully sent the OTP code!',
    )
  } catch (error) {
    logError(error, 'Resend OTP Controller')
    return writeJsonRes<null>(res, 500, null, 'Internal Server Error!')
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const user = await prisma.users.findFirst({
      where: {
        phone: req.body.phone,
      },
    })

    if (!user) {
      return writeJsonRes<null>(
        res,
        404,
        null,
        "This phone number hasn't been registered yet!",
      )
    }

    const isVerifiedPassword = await verifyString(
      req.body.password,
      user.password,
    )
    if (!isVerifiedPassword) {
      return writeJsonRes<null>(res, 400, null, 'Invalid password!')
    }

    // send otp to user via SMS message
    const otpCode = generateOTPCode()
    const hashedOtp = await hashString(otpCode)
    await refreshOTPCode(req.body.phone, hashedOtp)
    console.log('send otp to user via SMS message' + otpCode)

    const tokenData = {
      id: user.id,
    }
    return writeJsonRes<any>(
      res,
      200,
      {
        otpToken: getJwtToken(tokenData, JWT_TYPES.OTP),
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

    const otpCode = generateOTPCode()
    const hashedOtp = await hashString(otpCode)
    const hashedPassword = await hashString(req.body.password)
    const createdUser = await prisma.users.create({
      data: {
        name: getUsernameFromEmail(req.body.email),
        email: req.body.email,
        phone: req.body.phone,
        password: hashedPassword,
        otpCode: hashedOtp,
      },
    })

    // send otp to user via SMS message
    console.log('SIGN UP send otp to user via SMS message' + otpCode)

    const tokenData = {
      id: createdUser.id,
    }
    return writeJsonRes<any>(
      res,
      201,
      {
        otpToken: getJwtToken(tokenData, JWT_TYPES.OTP),
      },
      'Successfully created your account!',
    )
  } catch (error) {
    logError(error, 'Sign Up Controller')
    return writeJsonRes<null>(res, 500, null, 'Internal Server Error!')
  }
}

export const verifyOTPCode = async (req: Request, res: Response) => {
  try {
    const user = await prisma.users.findFirst({
      where: {
        phone: req.body.phone,
      },
    })
    if (!user) {
      return writeJsonRes<null>(res, 400, null, 'Invalid OTP code!')
    }

    const isVerifiedOTP = await verifyString(req.body?.otpCode, user?.otpCode)
    if (!isVerifiedOTP) {
      return writeJsonRes<null>(res, 400, null, 'Invalid OTP code!')
    }

    const otpCode = generateOTPCode()
    const hashedOtp = await hashString(otpCode)
    await refreshOTPCode(req.body.phone, hashedOtp)

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
      id: user.id,
    }

    return writeJsonRes<TokenResInterface>(
      res,
      200,
      {
        accessToken: getJwtToken(tokenData, JWT_TYPES.ACCESS),
        refreshToken: getJwtToken(refreshTokenData, JWT_TYPES.REFRESH),
      },
      'Successfully verified the OTP code!',
    )
  } catch (error) {
    logError(error, 'Verify OTP Controller')
    return writeJsonRes<null>(res, 500, null, 'Internal Server Error!')
  }
}

export const verifyResetOTPCode = async (req: Request, res: Response) => {
  try {
    const user = await prisma.users.findFirst({
      where: {
        phone: req.body.phone,
      },
    })
    if (!user) {
      return writeJsonRes<null>(res, 400, null, 'Invalid OTP code!')
    }

    const isVerifiedOTP = await verifyString(req.body?.otpCode, user?.otpCode)
    if (!isVerifiedOTP) {
      return writeJsonRes<null>(res, 400, null, 'Invalid OTP code!')
    }

    const otpCode = generateOTPCode()
    const hashedOtp = await hashString(otpCode)
    await refreshOTPCode(req.body.phone, hashedOtp)

    const tokenData = {
      id: user.id,
    }

    return writeJsonRes<any>(
      res,
      200,
      {
        resetToken: getJwtToken(tokenData, JWT_TYPES.RESET_PASSWORD),
      },
      'Successfully verified the OTP code!',
    )
  } catch (error) {
    logError(error, 'Verify Reset OTP Controller')
    return writeJsonRes<null>(res, 500, null, 'Internal Server Error!')
  }
}

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const hashedPassword = await hashString(req.body.newPassword)
    await prisma.users.update({
      where: {
        phone: req.body.phone,
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

export const getTokens = async (req: Request, res: Response) => {
  try {
    const user = await prisma.users.findFirst({
      where: {
        id: req.body.userId,
      },
    })

    const tokenData = {
      id: user?.id,
      name: user?.name,
      email: user?.email,
      phone: user?.phone,
      isPaid: user?.isPaid,
      startDate: user?.startDate,
      expiredDate: user?.expiredDate,
    }
    const refreshTokenData = {
      id: user?.id,
    }

    return writeJsonRes<TokenResInterface>(
      res,
      200,
      {
        accessToken: getJwtToken(tokenData, JWT_TYPES.ACCESS),
        refreshToken: getJwtToken(refreshTokenData, JWT_TYPES.REFRESH),
      },
      'Successfully verified the OTP code!',
    )
  } catch (error) {
    logError(error, 'Verify OTP Controller')
    return writeJsonRes<null>(res, 500, null, 'Internal Server Error!')
  }
}
