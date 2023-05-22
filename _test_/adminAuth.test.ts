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

describe('admin auth', () => {
    it('POST / admin / log in', async () => {
        return Request(app)
        .post('/admin/auth/login')
        .send({
            email: "admin@test.com",
            password: "12345"
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

    it('POST / admin / log in / if user tries more 3 times', async () => {
        return Request(app)
        .post('/admin/auth/login')
        .send({
            email: "admin@test.com",
            password: "12345"
        })
        .expect(400)
        .then((response) => {
            expect(response.body).toEqual(
                {
                    status: 400,
                    message: "Try again after 30 minutes!",
                    data: null
                }
            )
        })
    })

    it('POST / admin / log in / email not found', async () => {
        return Request(app)
        .post('/admin/auth/login')
        .send({
            email: "funnymail@test.com",
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

    it('POST / admin / log in / invalid password', async () => {
        return Request(app)
        .post('/admin/auth/login')
        .send({
            email: "admin@test.com",
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

    it('POST / admin / create admin', async () => {
        return Request(app)
        .post('/admin/auth/create-admin')
        .send({
            username: "Sai Min",
            email: "saimin@test.com",
            role: "admin role",
            password: "123"
        })
        .expect(201)
        .then((response) => {
            expect(response.body).toEqual(
                {
                    status: 201,
                    message: "Successfully created!",
                    data: {
                        id: expect.any(String),
                        username: expect.any(String),
                        email: expect.any(String),
                        createdAt: expect.any(String),
                        updatedAt: expect.any(String)
                    }
                }
            )
        })
    })

    it('POST / admin / create admin / email already used', async () => {
        return Request(app)
        .post('/admin/auth/create-admin')
        .send({
            username: "Sai Min",
            email: "saimin@test.com",
            role: "admin role",
            password: "123"
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

    it('POST / admin / invite admin', async () => {
        return Request(app)
        .post('/admin/auth/invite-admin')
        .send({
            email: "test@test.com"
        })
        .expect(200)
        .then((response) => {
            expect(response.body).toEqual(
                {
                    status: 200,
                    message: "Successfully sent invitation!",
                    data: null
                }
            )
        })
    })

    it('POST / admin / reset password / check email', async () => {
        return Request(app)
        .post('/admin/auth/check-email')
        .send({
            email: 'admin@test.com'
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

    it('POST / admin / reset password / check email / email not found', async () => {
        return Request(app)
        .post('/admin/auth/check-email')
        .send({
            email: "funnyadmin@test.com"
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

    it('POST / admin / reset password / verify code', async () => {
        return Request(app)
        .post('/admin/auth/verify-code')
        .send({
            email: 'saimin@test.com',
            verificationCode: await getValidVerificationCode('saimin@test.com') 
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

    it('POST / admin / reset password / invalid verification code', async () => {
        return Request(app)
        .post('/admin/auth/verify-code')
        .send({
            email: 'admin@test.com',
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

    it('POST / admin / reset password', async () => {
        return Request(app)
        .post('admin/auth/reset-password')
        .send({
            email: "test@test.com",
            newPassword: "12345"
        })
        .expect(200)
        .then((response) => {
            expect(response.body).toEqual(
                {
                    status: 200,
                    message: "Successfully changed your password!",
                    data: null
                }
            )
        })
    })
})