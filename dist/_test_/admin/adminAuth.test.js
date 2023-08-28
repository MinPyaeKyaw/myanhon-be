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
const __1 = __importDefault(require("../.."));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getValidVerificationCode = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const admin = (yield prisma.admins.findFirst({
        where: {
            email,
        },
    }));
    return admin.verificationCode;
});
describe('admin auth', () => {
    it('POST / admin / log in', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(__1.default)
            .post(process.env.API_PREFIX + '/admin/auth/login')
            .send({
            email: 'postman@test.com',
            password: '12345',
        })
            .expect(200)
            .then(response => {
            expect(response.body).toEqual({
                status: 200,
                message: 'Successfully logged in!',
                data: {
                    token: expect.any(String),
                },
            });
        });
    }));
    it('POST / admin / log in / if user tries more 3 times', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(__1.default)
            .post(process.env.API_PREFIX + '/admin/auth/login')
            .send({
            email: 'saiminR4MJIL@test.com',
            password: '123',
        })
            .expect(400)
            .then(response => {
            expect(response.body).toEqual({
                status: 400,
                message: expect.any(String),
                data: null,
            });
        });
    }));
    it('POST / admin / log in / email not found', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(__1.default)
            .post(process.env.API_PREFIX + '/admin/auth/login')
            .send({
            email: 'funnymail@test.com',
            password: '123',
        })
            .expect(404)
            .then(response => {
            expect(response.body).toEqual({
                status: 404,
                message: "This email hasn't been registered yet!",
                data: null,
            });
        });
    }));
    it('POST / admin / log in / invalid password', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(__1.default)
            .post(process.env.API_PREFIX + '/admin/auth/login')
            .send({
            email: 'postman@test.com',
            password: 'g3wg4',
        })
            .expect(400)
            .then(response => {
            expect(response.body).toEqual({
                status: 400,
                message: 'Invalid password!',
                data: null,
            });
        });
    }));
    // it('POST / admin / create admin', async () => {
    //     const otp = generateOTPCode();
    //     return Request(app)
    //     .post(process.env.API_PREFIX+'/admin/auth/create-admin')
    //     .send({
    //         name: "Sai Min"+otp,
    //         email: "saimin"+ otp +"@test.com",
    //         roleId: "ea41b95b-4602-48c3-baf5-9dd93e4fe1e4",
    //         password: "123"
    //     })
    //     .expect(201)
    //     .then((response) => {
    //         expect(response.body).toEqual(
    //             {
    //                 status: 201,
    //                 message: "Successfully created!",
    //                 data: {
    //                     id: expect.any(String),
    //                     name: expect.any(String),
    //                     email: expect.any(String),
    //                     createdAt: expect.any(String),
    //                     updatedAt: expect.any(String)
    //                 }
    //             }
    //         )
    //     })
    // })
    it('POST / admin / create admin / email already used', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(__1.default)
            .post(process.env.API_PREFIX + '/admin/auth/create-admin')
            .send({
            name: 'Sai Min',
            email: 'saimin@test.com',
            roleId: 'admin role',
            password: '123',
        })
            .expect(409)
            .then(response => {
            expect(response.body).toEqual({
                status: 409,
                message: 'This email is already used!',
                data: null,
            });
        });
    }));
    it('POST / admin / invite admin', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(__1.default)
            .post(process.env.API_PREFIX + '/admin/auth/invite-admin')
            .send({
            email: 'postman@test.com',
        })
            .expect(200)
            .then(response => {
            expect(response.body).toEqual({
                status: 200,
                message: 'Successfully sent invitation!',
                data: null,
            });
        });
    }));
    it('POST / admin / invite admin / arleady been an admin', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(__1.default)
            .post(process.env.API_PREFIX + '/admin/auth/invite-admin')
            .send({
            email: 'saimin@test.com',
        })
            .expect(400)
            .then(response => {
            expect(response.body).toEqual({
                status: 400,
                message: 'This user has already been an admin!',
                data: null,
            });
        });
    }));
    it('POST / admin / invite admin / user not found', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(__1.default)
            .post(process.env.API_PREFIX + '/admin/auth/invite-admin')
            .send({
            email: 'test@test.com',
        })
            .expect(404)
            .then(response => {
            expect(response.body).toEqual({
                status: 404,
                message: 'User not found!',
                data: null,
            });
        });
    }));
    it('POST / admin / reset password / check email', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(__1.default)
            .post(process.env.API_PREFIX + '/admin/auth/check-email')
            .send({
            email: 'postman@test.com',
        })
            .expect(200)
            .then(response => {
            expect(response.body).toEqual({
                status: 200,
                message: 'Verify your email!',
                data: null,
            });
        });
    }));
    it('POST / admin / reset password / check email / email not found', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(__1.default)
            .post(process.env.API_PREFIX + '/admin/auth/check-email')
            .send({
            email: 'funnyadmin@test.com',
        })
            .expect(404)
            .then(response => {
            expect(response.body).toEqual({
                status: 404,
                message: "This email hasn't been registered yet!",
                data: null,
            });
        });
    }));
    it('POST / admin / reset password / verify code', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(__1.default)
            .post(process.env.API_PREFIX + '/admin/auth/verify-code')
            .send({
            email: 'postman@test.com',
            verificationCode: yield getValidVerificationCode('postman@test.com'),
        })
            .expect(200)
            .then(response => {
            expect(response.body).toEqual({
                status: 200,
                message: 'Successfully verified!',
                data: expect.objectContaining({
                    token: expect.any(String),
                }),
            });
        });
    }));
    it('POST / admin / reset password / invalid verification code', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(__1.default)
            .post(process.env.API_PREFIX + '/admin/auth/verify-code')
            .send({
            email: 'admin@test.com',
            verificationCode: 'FAKECO',
        })
            .expect(400)
            .then(response => {
            expect(response.body).toEqual({
                status: 400,
                message: 'Invalid verification code',
                data: null,
            });
        });
    }));
    it('POST / admin / reset password', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(__1.default)
            .post(process.env.API_PREFIX + '/admin/auth/reset-password')
            .set('Authorization', 'bearer ' +
            '1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImJjMGU0NjNlLTA2MDMtNDY1NS1iNTI0LTI1YWUwZTQ2MTNjNSIsIm5hbWUiOiJVc2VybmFtZSIsImVtYWlsIjoidXNlcmVtYWlsQGV4YW1wbGUuY29tIiwicGhvbmUiOiIwOTEyMzQ1Njc4OSIsImlzUGFpZCI6ZmFsc2UsInN0YXJ0RGF0ZSI6bnVsbCwiZXhwaXJlZERhdGUiOm51bGwsImlhdCI6MTY4MjA5MzEyMn0.HXxPp4issE6Kqzj8ekuOpAcZ_eXPNV_AOwGk_W12S5A')
            .send({
            email: 'postman@test.com',
            newPassword: '12345',
        })
            .expect(200)
            .then(response => {
            expect(response.body).toEqual({
                status: 200,
                message: 'Successfully changed your password!',
                data: null,
            });
        });
    }));
});
