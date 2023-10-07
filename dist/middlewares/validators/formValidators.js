"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitExamFormValidation = exports.changePhoneFormValidation = exports.testTrackingValidation = exports.contentTrackingValidation = exports.refreshTokenValidation = exports.confirmPasswordFormValidation = exports.resetFormValidation = exports.sendOTPFormValidation = exports.verifyOTPFormValidation = exports.signupFormValidation = exports.loginFormValidation = exports.suggestFormValidation = exports.editUserProfileFormValidation = void 0;
const express_validator_1 = require("express-validator");
const getAndResValidationResultFns_1 = require("./getAndResValidationResultFns");
exports.editUserProfileFormValidation = [
    (0, express_validator_1.body)('email')
        .notEmpty()
        .withMessage('Email cannot be empty!')
        .isEmail()
        .withMessage('Invalid email!'),
    (0, express_validator_1.body)('name').notEmpty().withMessage('Name cannot be empty!'),
    (0, express_validator_1.param)('id').notEmpty().withMessage('User ID is required!'),
    getAndResValidationResultFns_1.getAndResValidationResult,
];
exports.suggestFormValidation = [
    (0, express_validator_1.body)('title').notEmpty().withMessage('Title cannot be empty!'),
    (0, express_validator_1.body)('suggestion').notEmpty().withMessage('Suggestion cannot be empty!'),
    getAndResValidationResultFns_1.getAndResValidationResult,
];
exports.loginFormValidation = [
    (0, express_validator_1.body)('phone').notEmpty().withMessage('Phone cannot be empty!'),
    (0, express_validator_1.body)('password').notEmpty().withMessage('Password cannot be empty!'),
    getAndResValidationResultFns_1.getAndResValidationResult,
];
exports.signupFormValidation = [
    (0, express_validator_1.body)('email')
        .notEmpty()
        .withMessage('Email cannot be empty!')
        .isEmail()
        .withMessage('Invalid email!'),
    (0, express_validator_1.body)('phone').notEmpty().withMessage('Phone cannot be empty!'),
    (0, express_validator_1.body)('password').notEmpty().withMessage('Password cannot be empty!'),
    getAndResValidationResultFns_1.getAndResValidationResult,
];
exports.verifyOTPFormValidation = [
    (0, express_validator_1.body)('phone').notEmpty().withMessage('Phone cannot be empty!'),
    (0, express_validator_1.body)('otpCode').notEmpty().withMessage('OTP code cannot be empty!'),
    getAndResValidationResultFns_1.getAndResValidationResult,
];
exports.sendOTPFormValidation = [
    (0, express_validator_1.body)('phone').notEmpty().withMessage('Phone cannot be empty!'),
    getAndResValidationResultFns_1.getAndResValidationResult,
];
exports.resetFormValidation = [
    (0, express_validator_1.body)('phone').notEmpty().withMessage('Phone cannot be empty!'),
    (0, express_validator_1.body)('newPassword').notEmpty().withMessage('Password cannot be empty!'),
    getAndResValidationResultFns_1.getAndResValidationResult,
];
exports.confirmPasswordFormValidation = [
    (0, express_validator_1.body)('userId').notEmpty().withMessage('User ID cannot be empty!'),
    (0, express_validator_1.body)('password').notEmpty().withMessage('Password cannot be empty!'),
    getAndResValidationResultFns_1.getAndResValidationResult,
];
exports.refreshTokenValidation = [
    (0, express_validator_1.body)('id').notEmpty().withMessage('User ID cannot be empty!'),
    getAndResValidationResultFns_1.getAndResValidationResult,
];
exports.contentTrackingValidation = [
    (0, express_validator_1.body)('userId').notEmpty().withMessage('User ID cannot be empty!'),
    (0, express_validator_1.body)('contentId').notEmpty().withMessage('Content ID cannot be empty!'),
    (0, express_validator_1.body)('completedPercent')
        .notEmpty()
        .withMessage('Completed percent cannot be empty!')
        .isNumeric()
        .withMessage('Completed percent must be a number!'),
    getAndResValidationResultFns_1.getAndResValidationResult,
];
exports.testTrackingValidation = [
    (0, express_validator_1.body)('userId').notEmpty().withMessage('User ID cannot be empty!'),
    (0, express_validator_1.body)('testId').notEmpty().withMessage('Test ID cannot be empty!'),
    (0, express_validator_1.body)('score')
        .notEmpty()
        .withMessage('Score cannot be empty!')
        .isNumeric()
        .withMessage('Score must be a number!'),
    getAndResValidationResultFns_1.getAndResValidationResult,
];
exports.changePhoneFormValidation = [
    (0, express_validator_1.param)('id').notEmpty().withMessage('User ID cannot be empty!'),
    (0, express_validator_1.body)('phone').notEmpty().withMessage('Phone cannot be empty!'),
    getAndResValidationResultFns_1.getAndResValidationResult,
];
exports.submitExamFormValidation = [
    (0, express_validator_1.body)('examId').notEmpty().withMessage('examId cannot be empty!'),
    (0, express_validator_1.body)('sections').isArray().withMessage('sections array cannot be empty!'),
    (0, express_validator_1.body)('sections.*.sectionId')
        .notEmpty()
        .withMessage('sectionId cannot be empty!'),
    (0, express_validator_1.body)('sections.*.questions')
        .isArray()
        .withMessage('sectionId cannot be empty!'),
    (0, express_validator_1.body)('sections.*.questions.*.questionId')
        .notEmpty()
        .withMessage('questionId cannot be empty!'),
    (0, express_validator_1.body)('sections.*.questions.*.answerId')
        .notEmpty()
        .withMessage('answerId cannot be empty!'),
    getAndResValidationResultFns_1.getAndResValidationResult,
];
