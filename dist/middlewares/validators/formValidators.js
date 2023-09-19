"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePhoneFormValidation = exports.testTrackingValidation = exports.contentTrackingValidation = exports.refreshTokenValidation = exports.confirmPasswordFormValidation = exports.resetFormValidation = exports.sendOTPFormValidation = exports.verifyOTPFormValidation = exports.signupFormValidation = exports.loginFormValidation = exports.suggestFormValidation = exports.editUserProfileFormValidation = void 0;
const express_validator_1 = require("express-validator");
const functions_1 = require("../../utils/functions");
exports.editUserProfileFormValidation = [
    (0, express_validator_1.body)('email')
        .notEmpty()
        .withMessage('Email cannot be empty!')
        .isEmail()
        .withMessage('Invalid email!'),
    (0, express_validator_1.body)('name').notEmpty().withMessage('Name cannot be empty!'),
    (0, express_validator_1.param)('id').notEmpty().withMessage('User ID is required!'),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return (0, functions_1.writeJsonRes)(res, 400, errors.array(), 'Invalid payload!');
        }
        next();
    },
];
exports.suggestFormValidation = [
    (0, express_validator_1.body)('title').notEmpty().withMessage('Title cannot be empty!'),
    (0, express_validator_1.body)('suggestion').notEmpty().withMessage('Suggestion cannot be empty!'),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return (0, functions_1.writeJsonRes)(res, 400, errors.array(), 'Invalid payload!');
        }
        next();
    },
];
exports.loginFormValidation = [
    (0, express_validator_1.body)('phone').notEmpty().withMessage('Phone cannot be empty!'),
    (0, express_validator_1.body)('password').notEmpty().withMessage('Password cannot be empty!'),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return (0, functions_1.writeJsonRes)(res, 400, errors.array(), 'Invalid payload!');
        }
        next();
    },
];
exports.signupFormValidation = [
    (0, express_validator_1.body)('email')
        .notEmpty()
        .withMessage('Email cannot be empty!')
        .isEmail()
        .withMessage('Invalid email!'),
    (0, express_validator_1.body)('phone').notEmpty().withMessage('Phone cannot be empty!'),
    (0, express_validator_1.body)('password').notEmpty().withMessage('Password cannot be empty!'),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return (0, functions_1.writeJsonRes)(res, 400, errors.array(), 'Invalid payload!');
        }
        next();
    },
];
exports.verifyOTPFormValidation = [
    (0, express_validator_1.body)('phone').notEmpty().withMessage('Phone cannot be empty!'),
    (0, express_validator_1.body)('otpCode').notEmpty().withMessage('OTP code cannot be empty!'),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return (0, functions_1.writeJsonRes)(res, 400, errors.array(), 'Invalid payload!');
        }
        next();
    },
];
exports.sendOTPFormValidation = [
    (0, express_validator_1.body)('phone').notEmpty().withMessage('Phone cannot be empty!'),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return (0, functions_1.writeJsonRes)(res, 400, errors.array(), 'Invalid payload!');
        }
        next();
    },
];
exports.resetFormValidation = [
    (0, express_validator_1.body)('phone').notEmpty().withMessage('Phone cannot be empty!'),
    (0, express_validator_1.body)('newPassword').notEmpty().withMessage('Password cannot be empty!'),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return (0, functions_1.writeJsonRes)(res, 400, errors.array(), 'Invalid payload!');
        }
        next();
    },
];
exports.confirmPasswordFormValidation = [
    (0, express_validator_1.body)('userId').notEmpty().withMessage('User ID cannot be empty!'),
    (0, express_validator_1.body)('password').notEmpty().withMessage('Password cannot be empty!'),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return (0, functions_1.writeJsonRes)(res, 400, errors.array(), 'Invalid payload!');
        }
        next();
    },
];
exports.refreshTokenValidation = [
    (0, express_validator_1.body)('id').notEmpty().withMessage('User ID cannot be empty!'),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return (0, functions_1.writeJsonRes)(res, 400, errors.array(), 'Invalid payload!');
        }
        next();
    },
];
exports.contentTrackingValidation = [
    (0, express_validator_1.body)('userId').notEmpty().withMessage('User ID cannot be empty!'),
    (0, express_validator_1.body)('contentId').notEmpty().withMessage('Content ID cannot be empty!'),
    (0, express_validator_1.body)('completedPercent')
        .notEmpty()
        .withMessage('Completed percent cannot be empty!')
        .isNumeric()
        .withMessage('Completed percent must be a number!'),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return (0, functions_1.writeJsonRes)(res, 400, errors.array(), 'Invalid payload!');
        }
        next();
    },
];
exports.testTrackingValidation = [
    (0, express_validator_1.body)('userId').notEmpty().withMessage('User ID cannot be empty!'),
    (0, express_validator_1.body)('testId').notEmpty().withMessage('Test ID cannot be empty!'),
    (0, express_validator_1.body)('score')
        .notEmpty()
        .withMessage('Score cannot be empty!')
        .isNumeric()
        .withMessage('Score must be a number!'),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return (0, functions_1.writeJsonRes)(res, 400, errors.array(), 'Invalid payload!');
        }
        next();
    },
];
exports.changePhoneFormValidation = [
    (0, express_validator_1.param)('id').notEmpty().withMessage('User ID cannot be empty!'),
    (0, express_validator_1.body)('phone').notEmpty().withMessage('Phone cannot be empty!'),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return (0, functions_1.writeJsonRes)(res, 400, errors.array(), 'Invalid payload!');
        }
        next();
    },
];
