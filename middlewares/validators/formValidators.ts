import { type NextFunction, type Request, type Response } from 'express'

import { body, param, validationResult } from 'express-validator'

import { writeJsonRes } from '../../utils/functions'

export const editUserProfileFormValidation = [
  body('email')
    .notEmpty()
    .withMessage('Email cannot be empty!')
    .isEmail()
    .withMessage('Invalid email!'),
  body('name').notEmpty().withMessage('Name cannot be empty!'),
  param('id').notEmpty().withMessage('User ID is required!'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return writeJsonRes<any>(res, 400, errors.array(), 'Invalid payload!')
    }

    next()
  },
]

export const suggestFormValidation = [
  body('title').notEmpty().withMessage('Title cannot be empty!'),
  body('suggestion').notEmpty().withMessage('Suggestion cannot be empty!'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return writeJsonRes<any>(res, 400, errors.array(), 'Invalid payload!')
    }

    next()
  },
]

export const loginFormValidation = [
  body('phone').notEmpty().withMessage('Phone cannot be empty!'),
  body('password').notEmpty().withMessage('Password cannot be empty!'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return writeJsonRes<any>(res, 400, errors.array(), 'Invalid payload!')
    }

    next()
  },
]

export const signupFormValidation = [
  body('email')
    .notEmpty()
    .withMessage('Email cannot be empty!')
    .isEmail()
    .withMessage('Invalid email!'),
  body('phone').notEmpty().withMessage('Phone cannot be empty!'),
  body('password').notEmpty().withMessage('Password cannot be empty!'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return writeJsonRes<any>(res, 400, errors.array(), 'Invalid payload!')
    }

    next()
  },
]

export const verifyOTPFormValidation = [
  body('phone').notEmpty().withMessage('Phone cannot be empty!'),
  body('otpCode').notEmpty().withMessage('OTP code cannot be empty!'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return writeJsonRes<any>(res, 400, errors.array(), 'Invalid payload!')
    }

    next()
  },
]

export const sendOTPFormValidation = [
  body('phone').notEmpty().withMessage('Phone cannot be empty!'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return writeJsonRes<any>(res, 400, errors.array(), 'Invalid payload!')
    }

    next()
  },
]

export const resetFormValidation = [
  body('phone').notEmpty().withMessage('Phone cannot be empty!'),
  body('newPassword').notEmpty().withMessage('Password cannot be empty!'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return writeJsonRes<any>(res, 400, errors.array(), 'Invalid payload!')
    }

    next()
  },
]

export const confirmPasswordFormValidation = [
  body('userId').notEmpty().withMessage('User ID cannot be empty!'),
  body('password').notEmpty().withMessage('Password cannot be empty!'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return writeJsonRes<any>(res, 400, errors.array(), 'Invalid payload!')
    }

    next()
  },
]

export const refreshTokenValidation = [
  body('id').notEmpty().withMessage('User ID cannot be empty!'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return writeJsonRes<any>(res, 400, errors.array(), 'Invalid payload!')
    }

    next()
  },
]

export const contentTrackingValidation = [
  body('userId').notEmpty().withMessage('User ID cannot be empty!'),
  body('contentId').notEmpty().withMessage('Content ID cannot be empty!'),
  body('completedPercent')
    .notEmpty()
    .withMessage('Completed percent cannot be empty!')
    .isNumeric()
    .withMessage('Completed percent must be a number!'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return writeJsonRes<any>(res, 400, errors.array(), 'Invalid payload!')
    }

    next()
  },
]

export const testTrackingValidation = [
  body('userId').notEmpty().withMessage('User ID cannot be empty!'),
  body('testId').notEmpty().withMessage('Test ID cannot be empty!'),
  body('score')
    .notEmpty()
    .withMessage('Score cannot be empty!')
    .isNumeric()
    .withMessage('Score must be a number!'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return writeJsonRes<any>(res, 400, errors.array(), 'Invalid payload!')
    }

    next()
  },
]

export const changePhoneFormValidation = [
  param('id').notEmpty().withMessage('User ID cannot be empty!'),
  body('phone').notEmpty().withMessage('Phone cannot be empty!'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return writeJsonRes<any>(res, 400, errors.array(), 'Invalid payload!')
    }

    next()
  },
]
