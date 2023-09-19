import { type NextFunction, type Request, type Response } from 'express'

import { validationResult } from 'express-validator'

import { logError, writeJsonRes } from '../../utils/functions'

export const validateCourseQuery = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const error = validationResult(req)

    if (!error.isEmpty()) {
      return writeJsonRes<null>(res, 400, null, 'Invalid query')
    }

    next()
  } catch (error) {
    logError(error, 'Validate Course Query Middleware')
    return writeJsonRes<null>(res, 500, null, 'Internal Server Error!')
  }
}
