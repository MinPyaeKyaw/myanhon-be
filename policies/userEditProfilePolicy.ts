import { type NextFunction, type Request, type Response } from 'express'

import {
  decodeJWT,
  getJwtTokenFromReq,
  logError,
  writeJsonRes,
} from '../utils/functions'

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

    next()
  } catch (error) {
    logError(error, 'User Edit Profile Policy')
    return writeJsonRes<null>(res, 500, null, 'Internal Server Error!')
  }
}

export const test = (id: string, ie: string) => {
  console.log(id, ie)
}
