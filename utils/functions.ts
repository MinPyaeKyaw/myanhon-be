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

  // @ts-expect-error
  if (!fs.existsSync(process.env.LOGGER_FILE)) {
    if (err instanceof Error) {
      // @ts-expect-error
      fs.writeFile(process.env.LOGGER_FILE, format, error => {
        if (error) {
          console.log('create error file', error)
        }
        // @ts-expect-error
        zipAndDelFile(process.env.LOGGER_FILE)
      })
    }
  } else {
    if (err instanceof Error) {
      // @ts-expect-error
      fs.appendFile(process.env.LOGGER_FILE, format, error => {
        if (error) {
          console.log('append error', error)
        }
        // @ts-expect-error
        zipAndDelFile(process.env.LOGGER_FILE)
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
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (let i = 0; i < 6; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length))
  }

  return result.toUpperCase()
}

export const refreshVerificationCode = async (email: string) => {
  try {
    const newCode = generateOTPCode()
    const updateCode = await prisma.users.update({
      where: {
        email,
      },
      data: {
        verificationCode: newCode,
      },
    })

    if (updateCode) {
      return true
    }
  } catch (error) {
    return false
  }
}

export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 10)
}

export const verifyPassword = async (
  userPassword: string,
  dbPassword: string,
): Promise<boolean> => {
  return await bcrypt
    .compare(userPassword, dbPassword)
    .then(res => {
      return res
    })
    .catch(() => {
      return false
    })
}

export const getJwtToken = (data: any, type: jwtType): string => {
  let exp, hehe

  if (type === JWT_TYPES.ACCESS) {
    exp = process.env.JWT_USER_EXP
    hehe = process.env.JWT_USER_SECRET
  } else if (type === JWT_TYPES.REFRESH) {
    exp = process.env.JWT_USER_EXP
    hehe = process.env.JWT_REFRESH_SECRET
  } else {
    exp = process.env.JWT_USER_EXP
    hehe = process.env.JWT_RESET_PASSWORD_SECRET
  }

  // @ts-expect-error
  const token = jwt.sign(data, hehe, {
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
  // @ts-expect-error
  publicKey.importKey(process.env.PAYMENT_PUBLIC_KEY, 'pkcs8-public')
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
