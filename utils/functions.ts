import type * as express from 'express'
import fs from 'fs'
import zlib from 'zlib'

import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dayjs from 'dayjs'
import { type RedisClientType, createClient } from 'redis'
import multer from 'multer'
import NodeRSA from 'node-rsa'

import { type jwtType, type AdminObjInterface } from './interfaces'
import { JWT_TYPES } from './enums'

const prisma: PrismaClient = new PrismaClient()

export const zipFile = (filePath: string) => {
  const splitedFilePath: string[] = filePath.split('/')
  let parentFolder: string = ''
  splitedFilePath.forEach((folder: string) => {
    if (folder !== splitedFilePath[splitedFilePath.length - 1]) {
      parentFolder = parentFolder + folder + '/'
    }
  })

  const zipFilename = `${parentFolder}${dayjs(new Date()).format(
    'DD-MM-YYYY-h-m-s',
  )}.zip`
  const readStream = fs.createReadStream(filePath)
  const writeStream = fs.createWriteStream(zipFilename)
  const zip = zlib.createGzip()
  return readStream.pipe(zip).pipe(writeStream)
}

export const getFileSize = async (
  filePath: string,
  unit: 'byte' | 'kb' | 'mb' | 'gb',
): Promise<number> => {
  const stats = await fs.promises.stat(filePath)

  if (unit === 'kb') {
    return stats.size / 1024
  }
  if (unit === 'mb') {
    return stats.size / (1024 * 1024)
  }
  if (unit === 'gb') {
    return stats.size / (1024 * 1024 * 1024)
  }

  return stats.size
}

export const zipAndDelFile = (filePath: string) => {
  getFileSize(filePath, 'kb').then(result => {
    if (result > 500) {
      zipFile(filePath).on('finish', () => {
        fs.unlink(filePath, err => {
          if (err) {
            console.log('delete error file', err)
          }
        })
      })
    }
  })
}

export const logError = (err: any, label: string): void => {
  console.log(label, err)

  const format = `${new Date()}[ ${label} ]\n${err.stack}\n\n`
  // const format = new Date() + '[ ' + label + ' ]' + '\n' + err.stack + '\n \n'

  if (!fs.existsSync(process.env.LOGGER_FILE as string)) {
    if (err instanceof Error) {
      fs.writeFile(process.env.LOGGER_FILE as string, format, error => {
        if (error) {
          console.log('create error file', error)
        }
        zipAndDelFile(process.env.LOGGER_FILE as string)
      })
    }
  } else {
    if (err instanceof Error) {
      fs.appendFile(process.env.LOGGER_FILE as string, format, error => {
        if (error) {
          console.log('append error', error)
        }
        zipAndDelFile(process.env.LOGGER_FILE as string)
      })
    }
  }
}

export const writeJsonRes = <ResDataType>(
  res: express.Response,
  status: number,
  data: ResDataType,
  message: string,
) => {
  return res
    .status(status)
    .json({
      status,
      message,
      data,
    })
    .end()
}

export const generateOTPCode = (): string => {
  let result = ''
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

  for (let i = 0; i < 6; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }

  return result.toUpperCase()
}

export const getUsernameFromEmail = (email: string): string => {
  return email.split('@')[0]
}

export const refreshOTPCode = async (
  phone: string,
  hashedCode: string,
): Promise<void> => {
  try {
    await prisma.users.update({
      where: {
        phone,
      },
      data: {
        otpCode: hashedCode,
      },
    })
  } catch (error) {
    console.log(error)
  }
}

export const hashString = async (string: string): Promise<string> => {
  return await bcrypt.hash(string, 10)
}

export const verifyString = async (
  userString: string,
  dbString: string,
): Promise<boolean> => {
  return await bcrypt
    .compare(userString, dbString)
    .then(res => {
      return res
    })
    .catch(() => {
      return false
    })
}

export const getJwtToken = (data: any, type: jwtType): string => {
  let exp, key

  if (type === JWT_TYPES.ACCESS) {
    exp = process.env.JWT_USER_EXP
    key = process.env.JWT_USER_SECRET
  } else if (type === JWT_TYPES.REFRESH) {
    exp = process.env.JWT_USER_EXP
    key = process.env.JWT_REFRESH_SECRET
  } else if (type === JWT_TYPES.OTP) {
    exp = process.env.JWT_VERIFY_EXP
    key = process.env.JWT_VERIFY_SECRET
  } else {
    exp = process.env.JWT_USER_EXP
    key = process.env.JWT_RESET_PASSWORD_SECRET
  }

  const token = jwt.sign(data, key as string, {
    expiresIn: exp,
  })

  return token
}

export const getJwtTokenFromReq = (
  authHeader: string | undefined,
): string | false => {
  if (!authHeader) {
    return false
  }
  return authHeader?.split(' ')[1]
}

export const isJwtExpired = (decodedToken: any): boolean => {
  if (decodedToken.exp < Math.floor(Date.now() / 1000)) return true

  return false
}

export const getConnectedRedisClient = async (): Promise<RedisClientType> => {
  const redisClient: RedisClientType = createClient()
  redisClient.on('error', err => {
    console.log('Redis Client Error', err)
  })
  await redisClient.connect()

  return redisClient
}

export const updateAdminLoginCount = async (
  admin: AdminObjInterface,
): Promise<boolean> => {
  try {
    // @ts-expect-error
    if (admin.loginTryCount < +process.env.ALLOWED_LOGIN_COUNT) {
      await prisma.admins.update({
        where: {
          email: admin.email,
        },
        data: {
          loginTryCount: admin.loginTryCount + 1,
        },
      })
    } else {
      await prisma.admins.update({
        where: {
          email: admin.email,
        },
        data: {
          loginTryCount: 0,
          latestLogin: new Date(),
        },
      })
    }
    return true
  } catch (error) {
    logError(error, 'Admin Update Count')
    return false
  }
}

export const uploadFile = () => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      console.log('lee', file)
      cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname)
    },
  })

  const upload = multer({ storage })

  return upload
}

export const encryptPaymentPayload = (paymentPayload: any): string | null => {
  // Encrypt payload
  const publicKey = new NodeRSA()
  publicKey.importKey(process.env.PAYMENT_PUBLIC_KEY as string, 'pkcs8-public')
  publicKey.setOptions({ encryptionScheme: 'pkcs1' })
  const encrytpStr = publicKey.encrypt(paymentPayload, 'base64')
  const param = { payload: encrytpStr }
  const payloadData = new URLSearchParams(param)
  const data = payloadData.get('payload')

  return data
}

export const calculatePercentage = (
  targetedValue: number,
  totalBaseValue: number,
): number => {
  return (targetedValue / totalBaseValue) * 100
}
