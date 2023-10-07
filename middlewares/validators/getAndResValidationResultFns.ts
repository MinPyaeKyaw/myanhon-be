import { type NextFunction, type Request, type Response } from 'express'
import { validationResult } from 'express-validator'
import { writeJsonRes } from '../../utils/functions'

export function getAndResValidationResult(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return writeJsonRes<any>(res, 400, errors.array(), 'Invalid payload!')
  }

  next()
}
