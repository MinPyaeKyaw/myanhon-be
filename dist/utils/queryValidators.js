"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.examQueryValidation = exports.courseQueryValidation = void 0;
const express_validator_1 = require("express-validator");
exports.courseQueryValidation = [
    (0, express_validator_1.query)('type').isString(),
    (0, express_validator_1.query)('level').isString(),
    (0, express_validator_1.query)('offset').isString(),
    (0, express_validator_1.query)('size').isString(),
];
exports.examQueryValidation = [
    (0, express_validator_1.query)('type').isString(),
    (0, express_validator_1.query)('level').isString(),
];
