import { type NextFunction, type Request, type Response } from 'express'
import i18n from 'i18n'

export const setPreferedLang = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const preferredLanguage = req.acceptsLanguages('en', 'mm')
  i18n.setLocale(preferredLanguage || 'en')
  next()
}
