import { type NextFunction, type Request, type Response } from 'express'

import { query, validationResult } from 'express-validator'

import { writeJsonRes } from '../../utils/functions'

export const getCoursesQueryValidation = [
  query('page')
    .exists()
    .withMessage('page query is required!')
    .notEmpty()
    .withMessage('page query cannot be empty!'),
  query('size')
    .exists()
    .withMessage('size query is required!')
    .notEmpty()
    .withMessage('size query cannot be empty!'),
  query('type')
    .optional()
    .notEmpty()
    .withMessage('type query cannot be empty!'),
  query('level')
    .optional()
    .notEmpty()
    .withMessage('level query cannot be empty!'),
  query('search').optional(),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return writeJsonRes<any>(res, 400, errors.array(), 'Invalid payload!')
    }

    next()
  },
]
