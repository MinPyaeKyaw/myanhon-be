import { type NextFunction, type Request, type Response } from 'express'

import { writeJsonRes } from '../../utils/functions'

export function apiKeyMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const apiKey = req.headers['x-api-key']

  if (apiKey !== process.env.API_KEY) {
    return writeJsonRes<null>(res, 404, null, '404 Not Found')
  }

  next()
}
