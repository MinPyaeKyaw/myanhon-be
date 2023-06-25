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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const __1 = __importDefault(require(".."));
const functions_1 = require("../utils/functions");
const client_1 = require("@prisma/client");
const testEnums_1 = require("../utils/testEnums");
const prisma = new client_1.PrismaClient();
const getValidVerificationCode = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma.users.findFirst({
        where: {
            email: email
        }
    });
    return user === null || user === void 0 ? void 0 : user.verificationCode;
});
describe('auth', () => {
    it('POST / user / log in', () => __awaiter(void 0, void 0, void 0, function* () {
        return (0, supertest_1.default)(__1.default)
            .post(process.env.API_PREFIX + '/auth/login')
            .send({
            email: "useremailUTLMPX@example.com",
            password: "4321",
        })
            .expect(200)
            .then((response) => {
            expect(response.body).toEqual({
                status: 200,
                message: "Successfully logged in!",
                data: {
                    token: expect.any(String)
                }
            });
        });
    }));
    it('POST / user / log in / email not found', () => __awaiter(void 0, void 0, void 0, function* () {
        return (0, supertest_1.default)(__1.default)
            .post(process.env.API_PREFIX + '/auth/login')
            .send({
            email: "useremailnotfound@example.com",
            password: "123",
        })
            .expect(404)
            .then((response) => {
            expect(response.body).toEqual({
                status: 404,
                message: "This email hasn't been registered yet!",
                data: null
            });
        });
    }));
    it('POST / user / log in / invalid password', () => __awaiter(void 0, void 0, void 0, function* () {
        return (0, supertest_1.default)(__1.default)
            .post(process.env.API_PREFIX + '/auth/login')
            .send({
            email: "useremailUTLMPX@example.com",
            password: "g3wg4",
        })
            .expect(400)
            .then((response) => {
            expect(response.body).toEqual({
                status: 400,
                message: "Invalid password!",
                data: null
            });
        });
    }));
    it("POST / user / log in / email not verified", () => __awaiter(void 0, void 0, void 0, function* () {
        return (0, supertest_1.default)(__1.default)
            .post(process.env.API_PREFIX + '/auth/login')
            .send({
            email: "useremailGHCR5P@example.com",
            password: '123',
        })
            .expect(400)
            .then((response) => {
            expect(response.body).toEqual({
                status: 400,
                message: "Verify your email!",
                data: null
            });
        });
    }));
    it('POST / user / sign up', () => __awaiter(void 0, void 0, void 0, function* () {
        const otp = (0, functions_1.generateOTPCode)();
        return (0, supertest_1.default)(__1.default)
            .post(process.env.API_PREFIX + '/auth/signup')
            .send({
            name: "Username",
            email: "useremail" + otp + "@example.com",
            phone: "09123456789",
            password: "123",
            verificationCode: otp
        })
            .expect(201)
            .then((response) => {
            expect(response.body).toEqual({
                status: 201,
                message: "Successfully created your account!",
                data: null
            });
        });
    }));
    it('POST / user / sign up / email is already used', () => __awaiter(void 0, void 0, void 0, function* () {
        const otp = (0, functions_1.generateOTPCode)();
        return (0, supertest_1.default)(__1.default)
            .post(process.env.API_PREFIX + '/auth/signup')
            .send({
            name: testEnums_1.testUser.name,
            email: testEnums_1.testUser.email,
            phone: testEnums_1.testUser.phone,
            password: testEnums_1.testUser.password,
            verificationCode: otp
        })
            .expect(409)
            .then((response) => {
            expect(response.body).toEqual({
                status: 409,
                message: "This email is already used!",
                data: null
            });
        });
    }));
    it('POST / user / verify email', () => __awaiter(void 0, void 0, void 0, function* () {
        return (0, supertest_1.default)(__1.default)
            .post(process.env.API_PREFIX + '/auth/verify-email')
            .send({
            email: testEnums_1.testUser.email,
            verificationCode: yield getValidVerificationCode(testEnums_1.testUser.email)
        })
            .expect(200)
            .then((response) => {
            expect(response.body).toEqual({
                status: 200,
                message: "Successfully verified your email!",
                data: expect.objectContaining({
                    token: expect.any(String)
                })
            });
        });
    }));
    it('POST / user / verify email / invalid verification code', () => __awaiter(void 0, void 0, void 0, function* () {
        return (0, supertest_1.default)(__1.default)
            .post(process.env.API_PREFIX + '/auth/verify-email')
            .send({
            email: testEnums_1.testUser.email,
            verificationCode: "2FF3JG"
        })
            .expect(400)
            .then((response) => {
            expect(response.body).toEqual({
                status: 400,
                message: 'Invalid verification code',
                data: null
            });
        });
    }));
    it('POST / user / verify email / email not found', () => __awaiter(void 0, void 0, void 0, function* () {
        return (0, supertest_1.default)(__1.default)
            .post(process.env.API_PREFIX + '/auth/verify-email')
            .send({
            email: "useremailnotfoundtoverify@example.com",
            verificationCode: "2FF3JG"
        })
            .expect(400)
            .then((response) => {
            expect(response.body).toEqual({
                status: 400,
                message: "This email hasn't been registered yet!",
                data: null
            });
        });
    }));
    it('POST / user / reset password / check email', () => __awaiter(void 0, void 0, void 0, function* () {
        return (0, supertest_1.default)(__1.default)
            .post(process.env.API_PREFIX + '/auth/check-email')
            .send({
            email: testEnums_1.testUser.email
        })
            .expect(200)
            .then((response) => {
            expect(response.body).toEqual({
                status: 200,
                message: "Verify your email!",
                data: null
            });
        });
    }));
    it('POST / user / reset password / check email / email not found', () => __awaiter(void 0, void 0, void 0, function* () {
        return (0, supertest_1.default)(__1.default)
            .post(process.env.API_PREFIX + '/auth/check-email')
            .send({
            email: "useremailnotfound@example.com"
        })
            .expect(404)
            .then((response) => {
            expect(response.body).toEqual({
                status: 404,
                message: "This email hasn't been registered yet!",
                data: null
            });
        });
    }));
    it('POST / user / reset password / verify code', () => __awaiter(void 0, void 0, void 0, function* () {
        return (0, supertest_1.default)(__1.default)
            .post(process.env.API_PREFIX + '/auth/verify-code')
            .send({
            email: testEnums_1.testUser.email,
            verificationCode: yield getValidVerificationCode(testEnums_1.testUser.email)
        })
            .expect(200)
            .then((response) => {
            expect(response.body).toEqual({
                status: 200,
                message: "Successfully verified!",
                data: expect.objectContaining({
                    token: expect.any(String)
                })
            });
        });
    }));
    it('POST / user / reset password / invalid verification code', () => __awaiter(void 0, void 0, void 0, function* () {
        return (0, supertest_1.default)(__1.default)
            .post(process.env.API_PREFIX + '/auth/verify-code')
            .send({
            email: testEnums_1.testUser.email,
            verificationCode: "FAKECO"
        })
            .expect(400)
            .then((response) => {
            expect(response.body).toEqual({
                status: 400,
                message: 'Invalid verification code',
                data: null
            });
        });
    }));
    it('POST / user / reset password', () => __awaiter(void 0, void 0, void 0, function* () {
        return (0, supertest_1.default)(__1.default)
            .patch(process.env.API_PREFIX + '/auth/reset-password')
            .set('Authorization', 'bearer ' + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJlbWFpbEBleGFtcGxlLmNvbSIsImNvZGUiOiJMMVVZNlciLCJyZXNldFBhc3N3b3JkVG9rZW4iOnRydWUsImlhdCI6MTY4MjE0NjEwOX0.Sa2lvJ4wfBnLuXSYYXFWWQWnuQOLAfI3Klh98HaiRQw")
            .send({
            newPassword: "4321",
            email: "useremailUTLMPX@example.com"
        })
            .expect(200)
            .then((response) => {
            expect(response.body).toEqual({
                status: 200,
                message: 'Successfully changed your password!',
                data: null
            });
        });
    }));
});
