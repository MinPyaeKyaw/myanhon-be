"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editUserProfileFormValidation = void 0;
const express_validator_1 = require("express-validator");
const functions_1 = require("../../utils/functions");
exports.editUserProfileFormValidation = [
    (0, express_validator_1.body)('email').notEmpty().isEmail(),
    (0, express_validator_1.body)('name').notEmpty(),
    (0, express_validator_1.param)('id').notEmpty().withMessage('User ID is required!'),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return (0, functions_1.writeJsonRes)(res, 400, errors.array(), 'Invalid payload!');
        }
        next();
    },
];
