import { body, param } from 'express-validator'

import { getAndResValidationResult } from './getAndResValidationResultFns'

export const editUserProfileFormValidation = [
  body('email')
    .notEmpty()
    .withMessage('Email cannot be empty!')
    .isEmail()
    .withMessage('Invalid email!'),
  body('name').notEmpty().withMessage('Name cannot be empty!'),
  param('id').notEmpty().withMessage('User ID is required!'),
  getAndResValidationResult,
]

export const suggestFormValidation = [
  body('title').notEmpty().withMessage('Title cannot be empty!'),
  body('suggestion').notEmpty().withMessage('Suggestion cannot be empty!'),
  getAndResValidationResult,
]

export const loginFormValidation = [
  body('phone').notEmpty().withMessage('Phone cannot be empty!'),
  body('password').notEmpty().withMessage('Password cannot be empty!'),
  getAndResValidationResult,
]

export const signupFormValidation = [
  body('email')
    .notEmpty()
    .withMessage('Email cannot be empty!')
    .isEmail()
    .withMessage('Invalid email!'),
  body('phone').notEmpty().withMessage('Phone cannot be empty!'),
  body('password').notEmpty().withMessage('Password cannot be empty!'),
  getAndResValidationResult,
]

export const verifyOTPFormValidation = [
  body('phone').notEmpty().withMessage('Phone cannot be empty!'),
  body('otpCode').notEmpty().withMessage('OTP code cannot be empty!'),
  getAndResValidationResult,
]

export const sendOTPFormValidation = [
  body('phone').notEmpty().withMessage('Phone cannot be empty!'),
  getAndResValidationResult,
]

export const resetFormValidation = [
  body('phone').notEmpty().withMessage('Phone cannot be empty!'),
  body('newPassword').notEmpty().withMessage('Password cannot be empty!'),
  getAndResValidationResult,
]

export const confirmPasswordFormValidation = [
  body('userId').notEmpty().withMessage('User ID cannot be empty!'),
  body('password').notEmpty().withMessage('Password cannot be empty!'),
  getAndResValidationResult,
]

export const refreshTokenValidation = [
  body('id').notEmpty().withMessage('User ID cannot be empty!'),
  getAndResValidationResult,
]

export const contentTrackingValidation = [
  body('userId').notEmpty().withMessage('User ID cannot be empty!'),
  body('contentId').notEmpty().withMessage('Content ID cannot be empty!'),
  body('completedPercent')
    .notEmpty()
    .withMessage('Completed percent cannot be empty!')
    .isNumeric()
    .withMessage('Completed percent must be a number!'),
  getAndResValidationResult,
]

export const testTrackingValidation = [
  body('userId').notEmpty().withMessage('User ID cannot be empty!'),
  body('testId').notEmpty().withMessage('Test ID cannot be empty!'),
  body('score')
    .notEmpty()
    .withMessage('Score cannot be empty!')
    .isNumeric()
    .withMessage('Score must be a number!'),
  getAndResValidationResult,
]

export const changePhoneFormValidation = [
  param('id').notEmpty().withMessage('User ID cannot be empty!'),
  body('phone').notEmpty().withMessage('Phone cannot be empty!'),
  getAndResValidationResult,
]

export const submitExamFormValidation = [
  body('examId').notEmpty().withMessage('examId cannot be empty!'),
  body('sections').isArray().withMessage('sections array cannot be empty!'),
  body('sections.*.sectionId')
    .notEmpty()
    .withMessage('sectionId cannot be empty!'),
  body('sections.*.questions')
    .isArray()
    .withMessage('sectionId cannot be empty!'),
  body('sections.*.questions.*.questionId')
    .notEmpty()
    .withMessage('questionId cannot be empty!'),
  body('sections.*.questions.*.answerId')
    .notEmpty()
    .withMessage('answerId cannot be empty!'),
  getAndResValidationResult,
]
