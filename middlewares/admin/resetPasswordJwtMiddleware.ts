import { type NextFunction, type Request, type Response } from 'express'

import jwtDecode from 'jwt-decode'

import {
  getJwtTokenFromReq,
  logError,
  writeJsonRes,
} from '../../utils/functions'

export const verifyResetPasswordJwt = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = getJwtTokenFromReq(req.headers.authorization)
    if (!token) {
      return writeJsonRes<null>(res, 401, null, 'Unthorizied access!')
    }

    const decodedToken: any = jwtDecode(token)
    if (!decodedToken.adminResetPasswordToken) {
      return writeJsonRes<null>(res, 401, null, 'Invalid token!')
    }

    next()
  } catch (error) {
    logError(error, 'Verify Reset Password JWT Middleware')
    return writeJsonRes<null>(res, 500, null, 'Internal Server Error!')
  }
}
