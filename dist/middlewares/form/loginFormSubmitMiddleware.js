"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginFormValidation = void 0;
const express_validator_1 = require("express-validator");
const functions_1 = require("../../utils/functions");
exports.loginFormValidation = [
    (0, express_validator_1.body)('phone').notEmpty(),
    (0, express_validator_1.body)('password').notEmpty(),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return (0, functions_1.writeJsonRes)(res, 400, errors.array(), 'Invalid payload!');
        }
        next();
    },
];
