import Request from 'supertest';
import app from '..';
import { response } from 'express';

describe('auth', () => {
    it('POST / user / log in', () => {
        return Request(app)
        .post('/auth/login')
        .expect(200)
        .then((response) => {
            expect(response.body).toEqual(
                expect.objectContaining(
                    {
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
                    }
                )
            )
        })
    })

    it('POST / user / log in / email not found', () => {
        return Request(app)
        .post('/auth/login')
        .expect(200)
        .then((response) => {
            expect(response.body).toEqual(
                expect.objectContaining({
                    status: 404,
                    message: "This email hasn't been registered yet!"
                })
            )
        })
    })

    it('POST / user / log in / invalid password', () => {
        return Request(app)
        .post('/auth/login')
        .expect(400)
        .then((response) => {
            expect(response.body).toEqual(
                expect.objectContaining({
                    status: 400,
                    message: "Invalid password!"
                })
            )
        })
    })

    it("POST / user / log in / email not verified", () => {
        return Request(app)
        .post('auth/login')
        .expect(200)
        .then((response) => {
            expect(response.body).toEqual(
                expect.objectContaining({
                    status: 400,
                    message: "Verify your email!"
                })
            )
        })
    })

    it('POST / user / sign up', () => {
        return Request(app)
        .post('/auth/signup')
        .expect(200)
        .then((response) => {
            expect(response.body).toEqual(
                expect.objectContaining(
                    {
                        status: 201,
                        message: "Successfully created your account!"
                    }
                )
            )
        })
    })

    it('POST / user / verify email', () => {
        return Request(app)
        .post('/auth/verify-email')
        .expect(200)
        .then((response) => {
            expect(response.body).toEqual(
                expect.objectContaining(
                    {
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
                    }
                )
            )
        })
    })

    it('POST / user / verify email / invalid verification code', () => {
        return Request(app)
        .post('/auth/verify-email')
        .expect(400)
        .then((response) => {
            expect(response.body).toEqual(
                expect.objectContaining({
                    status: 400,
                    message: 'Invalid verification code'
                })
            )
        }) 
    })

    it('POST / user / verify email / email not found', () => {
        return Request(app)
        .post('/auth/verify-email')
        .expect(200)
        .then((response) => {
            expect(response.body).toEqual(
                expect.objectContaining({
                    status: 404,
                    message: "This email hasn't been registered yet!"
                })
            )
        })
    })

    it('POST / user / reset password', () => {
        return Request(app)
        .post('/auth/reset-password')
        .expect(200)
        .then((response) => {
            expect(response.body).toEqual(
                expect.objectContaining({
                    status: 200,
                    message: "Successfully changed your password!"
                })
            )
        })
    })

    it('POST / user / reset password / email not found', () => {
        return Request(app)
        .post('/auth/reset-password')
        .expect(200)
        .then((response) => {
            expect(response.body).toEqual(
                expect.objectContaining({
                    status: 404,
                    message: "This email hasn't been registered yet!"
                })
            )
        })
    })

    it('POST / user / reset password / verify code', () => {
        return Request(app)
        .post('/auth/reset-password')
        .expect(200)
        .then((response) => {
            expect(response.body).toEqual(
                expect.objectContaining({
                    status: 200,
                    message: "Successfully verified!"
                })
            )
        })
    })

    it('POST / user / reset password / invalid verification code', () => {
        return Request(app)
        .post('/auth/reset-password')
        .expect(400)
        .then((response) => {
            expect(response.body).toEqual(
                expect.objectContaining({
                    status: 400,
                    message: 'Invalid verification code'
                })
            )
        }) 
    })

})