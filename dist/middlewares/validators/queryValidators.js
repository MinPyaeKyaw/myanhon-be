"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExamResultsByUserValidation = exports.getQuestionsBySectionValidation = exports.getExamQueryValidation = exports.getCoursesQueryValidation = void 0;
const express_validator_1 = require("express-validator");
const getAndResValidationResultFns_1 = require("./getAndResValidationResultFns");
exports.getCoursesQueryValidation = [
    (0, express_validator_1.query)('page')
        .exists()
        .withMessage('page query is required!')
        .notEmpty()
        .withMessage('page query cannot be empty!'),
    (0, express_validator_1.query)('size')
        .exists()
        .withMessage('size query is required!')
        .notEmpty()
        .withMessage('size query cannot be empty!'),
    (0, express_validator_1.query)('type')
        .optional()
        .notEmpty()
        .withMessage('type query cannot be empty!'),
    (0, express_validator_1.query)('level')
        .optional()
        .notEmpty()
        .withMessage('level query cannot be empty!'),
    (0, express_validator_1.query)('search').optional(),
    getAndResValidationResultFns_1.getAndResValidationResult,
];
exports.getExamQueryValidation = [
    (0, express_validator_1.query)('type').notEmpty().withMessage('type query cannot be empty!'),
    (0, express_validator_1.query)('level').notEmpty().withMessage('level query cannot be empty!'),
    getAndResValidationResultFns_1.getAndResValidationResult,
];
exports.getQuestionsBySectionValidation = [
    (0, express_validator_1.query)('questionCount').notEmpty().withMessage('type query cannot be empty!'),
    (0, express_validator_1.param)('sectionId').notEmpty().withMessage('sectionId cannot be empty!'),
    getAndResValidationResultFns_1.getAndResValidationResult,
];
exports.getExamResultsByUserValidation = [
    (0, express_validator_1.param)('userId').notEmpty().withMessage('userId cannot be empty!'),
    getAndResValidationResultFns_1.getAndResValidationResult,
];
