"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCoursesQueryValidation = void 0;
const express_validator_1 = require("express-validator");
const functions_1 = require("../../utils/functions");
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
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return (0, functions_1.writeJsonRes)(res, 400, errors.array(), 'Invalid payload!');
        }
        next();
    },
];
