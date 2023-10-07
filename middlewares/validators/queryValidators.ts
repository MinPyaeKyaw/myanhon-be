import { query, param } from 'express-validator'

import { getAndResValidationResult } from './getAndResValidationResultFns'

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
  getAndResValidationResult,
]

export const getExamQueryValidation = [
  query('type').notEmpty().withMessage('type query cannot be empty!'),
  query('level').notEmpty().withMessage('level query cannot be empty!'),
  getAndResValidationResult,
]

export const getQuestionsBySectionValidation = [
  query('questionCount').notEmpty().withMessage('type query cannot be empty!'),
  param('sectionId').notEmpty().withMessage('sectionId cannot be empty!'),
  getAndResValidationResult,
]

export const getExamResultsByUserValidation = [
  param('userId').notEmpty().withMessage('userId cannot be empty!'),
  getAndResValidationResult,
]
