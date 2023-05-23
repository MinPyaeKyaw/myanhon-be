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
        .post(process.env.API_PREFIX+'/admin/auth/login')
        .send({
            email: "postman@test.com",
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
        .post(process.env.API_PREFIX+'/admin/auth/login')
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
        .post(process.env.API_PREFIX+'/admin/auth/login')
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
        .post(process.env.API_PREFIX+'/admin/auth/login')
        .send({
            email: "postman@test.com",
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

    it('POST / admin / create admin / email already used', async () => {
        return Request(app)
        .post(process.env.API_PREFIX+'/admin/auth/create-admin')
        .send({
            name: "Sai Min",
            email: "saimin@test.com",
            roleId: "admin role",
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
        .post(process.env.API_PREFIX+'/admin/auth/invite-admin')
        .send({
            email: "postman@test.com"
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

    it('POST / admin / invite admin / arleady been an admin', async () => {
        return Request(app)
        .post(process.env.API_PREFIX+'/admin/auth/invite-admin')
        .send({
            email: "saimin@test.com"
        })
        .expect(400)
        .then((response) => {
            expect(response.body).toEqual(
                {
                    status: 400,
                    message: "This user has already been an admin!",
                    data: null
                }
            )
        })
    })

    it('POST / admin / invite admin / user not found', async () => {
        return Request(app)
        .post(process.env.API_PREFIX+'/admin/auth/invite-admin')
        .send({
            email: "test@test.com"
        })
        .expect(404)
        .then((response) => {
            expect(response.body).toEqual(
                {
                    status: 404,
                    message: "User not found!",
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