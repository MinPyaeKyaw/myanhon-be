import Request from 'supertest';
import app from '..';
import { generateOTPCode } from '../utils/functions';
import { PrismaClient } from '@prisma/client';
import { testUser } from '../utils/testEnums';

const getValidVerificationCode = async (email:string) => {
    const prisma:PrismaClient = new PrismaClient()

    const user = await prisma.users.findFirst({
        where: {
            email: email
        }
    })

    return user?.verificationCode;
}

describe('auth', () => {

    it('POST / user / log in', async () => {
        return Request(app)
        .post('/auth/login')
        .send({
            email: "useremailUTLMPX@example.com",
            password: "4321",
        })
        .expect(200)
        .then((response) => {
            expect(response.body).toEqual(
                {
                    status: 200,
                    message: "Successfully logged in!",
                    data: {
                        token: expect.any(String)
                    }
                }
            )
        })
    })

    it('POST / user / log in / email not found', async () => {
        return Request(app)
        .post('/auth/login')
        .send({
            email: "useremailnotfound@example.com",
            password: "123",
        })
        .expect(404)
        .then((response) => {
            expect(response.body).toEqual(
                {
                    status: 404,
                    message: "This email hasn't been registered yet!",
                    data: null
                }
            )
        })
    })

    it('POST / user / log in / invalid password', async () => {
        return Request(app)
        .post('/auth/login')
        .send({
            email: "useremailUTLMPX@example.com",
            password: "g3wg4",
        })
        .expect(400)
        .then((response) => {
            expect(response.body).toEqual(
                {
                    status: 400,
                    message: "Invalid password!",
                    data: null
                }
            )
        })
    })

    it("POST / user / log in / email not verified", async () => {
        return Request(app)
        .post('/auth/login')
        .send({
            email: "useremailGHCR5P@example.com",
            password: '123',
        })
        .expect(400)
        .then((response) => {
            expect(response.body).toEqual(
                {
                    status: 400,
                    message: "Verify your email!",
                    data: null
                }
            )
        })
    })

    it('POST / user / sign up', async () => {

        const otp = generateOTPCode();

        return Request(app)
        .post('/auth/signup')
        .send({
            name: "Username",
            email: "useremail"+otp+"@example.com",
            phone: "09123456789",
            password: "123",
            verificationCode: otp
        })
        .expect(201)
        .then((response) => {
            expect(response.body).toEqual(
                {
                    status: 201,
                    message: "Successfully created your account!",
                    data: null
                }
            )
        })
    })

    it('POST / user / sign up / email is already used', async () => {

        const otp = generateOTPCode();

        return Request(app)
        .post('/auth/signup')
        .send({
            name: testUser.name,
            email: testUser.email,
            phone: testUser.phone,
            password: testUser.password,
            verificationCode: otp
        })
        .expect(409)
        .then((response) => {
            expect(response.body).toEqual(
                {
                    status: 409,
                    message: "This email is already used!",
                    data: null
                }
            )
        })
    })

    it('POST / user / verify email', async () => {
        return Request(app)
        .post('/auth/verify-email')
        .send({
            email: testUser.email,
            verificationCode: await getValidVerificationCode(testUser.email)
        })
        .expect(200)
        .then((response) => {
            expect(response.body).toEqual(
                {
                    status: 200,
                    message: "Successfully verified your email!",
                    data: expect.objectContaining({
                        token: expect.any(String)
                    })
                }
            )
        })
    })

    it('POST / user / verify email / invalid verification code', async () => {
        return Request(app)
        .post('/auth/verify-email')
        .send({
            email: testUser.email,
            verificationCode: "2FF3JG"
        })
        .expect(400)
        .then((response) => {
            expect(response.body).toEqual(
                {
                    status: 400,
                    message: 'Invalid verification code',
                    data: null
                }
            )
        }) 
    })

    it('POST / user / verify email / email not found', async () => {
        return Request(app)
        .post('/auth/verify-email')
        .send({
            email: "useremailnotfoundtoverify@example.com",
            verificationCode: "2FF3JG"
        })
        .expect(400)
        .then((response) => {
            expect(response.body).toEqual(
                {
                    status: 400,
                    message: "This email hasn't been registered yet!",
                    data: null
                }
            )
        })
    })

    it('POST / user / reset password / check email', async () => {
        return Request(app)
        .post('/auth/check-email')
        .send({
            email: testUser.email
        })
        .expect(200)
        .then((response) => {
            expect(response.body).toEqual(
                {
                    status: 200,
                    message: "Verify your email!",
                    data: null
                }
            )
        })
    })

    it('POST / user / reset password / check email / email not found', async () => {
        return Request(app)
        .post('/auth/check-email')
        .send({
            email: "useremailnotfound@example.com"
        })
        .expect(404)
        .then((response) => {
            expect(response.body).toEqual(
                {
                    status: 404,
                    message: "This email hasn't been registered yet!",
                    data: null
                }
            )
        })
    })

    it('POST / user / reset password / verify code', async () => {
        return Request(app)
        .post('/auth/verify-code')
        .send({
            email: testUser.email,
            verificationCode: await getValidVerificationCode(testUser.email) 
        })
        .expect(200)
        .then((response) => {
            expect(response.body).toEqual(
                {
                    status: 200,
                    message: "Successfully verified!",
                    data: expect.objectContaining(
                        {
                            token: expect.any(String)
                        }
                    )
                }
            )
        })
    })

    it('POST / user / reset password / invalid verification code', async () => {
        return Request(app)
        .post('/auth/verify-code')
        .send({
            email: testUser.email,
            verificationCode: "FAKECO"      
        })
        .expect(400)
        .then((response) => {
            expect(response.body).toEqual(
                {
                    status: 400,
                    message: 'Invalid verification code',
                    data: null
                }
            )
        }) 
    })

    it('POST / user / reset password', async () => {
        return Request(app)
        .patch('/auth/reset-password')
        .set('Authorization', 'bearer ' + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJlbWFpbEBleGFtcGxlLmNvbSIsImNvZGUiOiJMMVVZNlciLCJyZXNldFBhc3N3b3JkVG9rZW4iOnRydWUsImlhdCI6MTY4MjE0NjEwOX0.Sa2lvJ4wfBnLuXSYYXFWWQWnuQOLAfI3Klh98HaiRQw")
        .send({
            newPassword: "4321",
            email: "useremailUTLMPX@example.com"
        })
        .expect(200)
        .then((response) => {
            expect(response.body).toEqual(
                {
                    status: 200,
                    message: 'Successfully changed your password!',
                    data: null
                }
            )
        })
    })
})