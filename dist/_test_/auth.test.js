"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const __1 = __importDefault(require(".."));
describe('auth', () => {
    it('POST / user / log in', () => {
        return (0, supertest_1.default)(__1.default)
            .post('/auth/login')
            .expect(200)
            .then((response) => {
            expect(response.body).toEqual(expect.objectContaining({
                status: 200,
                message: "Successfully logged in!",
                data: {
                    id: expect.any(String),
                    name: expect.any(String),
                    email: expect.any(String),
                    phone: expect.any(String),
                    photo: expect.any(String),
                    isPaid: expect.any(Boolean),
                    startDate: expect.any(String),
                    endDate: expect.any(String),
                    token: expect.any(String)
                }
            }));
        });
    });
    it('POST / user / log in / email not found', () => {
        return (0, supertest_1.default)(__1.default)
            .post('/auth/login')
            .expect(200)
            .then((response) => {
            expect(response.body).toEqual(expect.objectContaining({
                status: 404,
                message: "This email hasn't been registered yet!"
            }));
        });
    });
    it('POST / user / log in / invalid password', () => {
        return (0, supertest_1.default)(__1.default)
            .post('/auth/login')
            .expect(400)
            .then((response) => {
            expect(response.body).toEqual(expect.objectContaining({
                status: 400,
                message: "Invalid password!"
            }));
        });
    });
    it("POST / user / log in / email not verified", () => {
        return (0, supertest_1.default)(__1.default)
            .post('auth/login')
            .expect(200)
            .then((response) => {
            expect(response.body).toEqual(expect.objectContaining({
                status: 400,
                message: "Verify your email!"
            }));
        });
    });
    it('POST / user / sign up', () => {
        return (0, supertest_1.default)(__1.default)
            .post('/auth/signup')
            .expect(200)
            .then((response) => {
            expect(response.body).toEqual(expect.objectContaining({
                status: 201,
                message: "Successfully created your account!"
            }));
        });
    });
    it('POST / user / verify email', () => {
        return (0, supertest_1.default)(__1.default)
            .post('/auth/verify-email')
            .expect(200)
            .then((response) => {
            expect(response.body).toEqual(expect.objectContaining({
                status: 200,
                message: "Successfully verified your email!",
                data: {
                    id: expect.any(String),
                    name: expect.any(String),
                    email: expect.any(String),
                    phone: expect.any(String),
                    photo: expect.any(String),
                    isPaid: expect.any(Boolean),
                    startDate: expect.any(String),
                    endDate: expect.any(String),
                    token: expect.any(String)
                }
            }));
        });
    });
    it('POST / user / verify email / invalid verification code', () => {
        return (0, supertest_1.default)(__1.default)
            .post('/auth/verify-email')
            .expect(400)
            .then((response) => {
            expect(response.body).toEqual(expect.objectContaining({
                status: 400,
                message: 'Invalid verification code'
            }));
        });
    });
    it('POST / user / verify email / email not found', () => {
        return (0, supertest_1.default)(__1.default)
            .post('/auth/verify-email')
            .expect(200)
            .then((response) => {
            expect(response.body).toEqual(expect.objectContaining({
                status: 404,
                message: "This email hasn't been registered yet!"
            }));
        });
    });
    it('POST / user / reset password', () => {
        return (0, supertest_1.default)(__1.default)
            .post('/auth/reset-password')
            .expect(200)
            .then((response) => {
            expect(response.body).toEqual(expect.objectContaining({
                status: 200,
                message: "Successfully changed your password!"
            }));
        });
    });
    it('POST / user / reset password / email not found', () => {
        return (0, supertest_1.default)(__1.default)
            .post('/auth/reset-password')
            .expect(200)
            .then((response) => {
            expect(response.body).toEqual(expect.objectContaining({
                status: 404,
                message: "This email hasn't been registered yet!"
            }));
        });
    });
    it('POST / user / reset password / verify code', () => {
        return (0, supertest_1.default)(__1.default)
            .post('/auth/reset-password')
            .expect(200)
            .then((response) => {
            expect(response.body).toEqual(expect.objectContaining({
                status: 200,
                message: "Successfully verified!"
            }));
        });
    });
    it('POST / user / reset password / invalid verification code', () => {
        return (0, supertest_1.default)(__1.default)
            .post('/auth/reset-password')
            .expect(400)
            .then((response) => {
            expect(response.body).toEqual(expect.objectContaining({
                status: 400,
                message: 'Invalid verification code'
            }));
        });
    });
});
