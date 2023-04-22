"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const functions_1 = require("../utils/functions");
const testEnums_1 = require("../utils/testEnums");
describe('Utils', () => {
    it('Utils / functions / generate OTP codes with 6 length', () => {
        expect(typeof (0, functions_1.generateOTPCode)()).toBe('string');
        expect((0, functions_1.generateOTPCode)().length).toBe(6);
    });
    it('Utils / functions / refresh verification code success', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(yield (0, functions_1.refreshVerificationCode)('useremail@example.com')).toBe(true);
    }));
    it('Utils / functions / refresh verification code fail', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(yield (0, functions_1.refreshVerificationCode)('useremailfailemail@example.com')).toBe(false);
    }));
    it('Utils / functions / hash password', () => __awaiter(void 0, void 0, void 0, function* () {
        let password = 'examplePassword';
        expect((0, functions_1.hashPassword)(password)).not.toBe(password);
    }));
    it('Utils / function / verify password', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(typeof (yield (0, functions_1.verifyPassword)('userpassword', 'dbpassword'))).toBe('boolean');
    }));
    it('Utils / function / getUserJwtToken', () => __awaiter(void 0, void 0, void 0, function* () {
        let data = {
            name: testEnums_1.testUser.name,
            password: testEnums_1.testUser.password
        };
        expect(typeof (0, functions_1.getJwtToken)(data, testEnums_1.tokenSecrets)).toBe('string');
    }));
});
