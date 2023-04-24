import Request from 'supertest';
import app from '..';

describe('middlewares', () => {
    it('POST / user / reset password / unauthorized access', async () => {
        return Request(app)
        .patch('/auth/reset-password')
        .send({
            newPassword: "4321",
            email: "useremailUTLMPX@example.com"
        })
        .expect(401)
        .then((response) => {
            expect(response.body).toEqual(
                {
                    status: 401,
                    message: "Unthorizied access!",
                    data: null
                }
            )
        })
    })

    it('POST / user / reset password / invalid token', async () => {
        return Request(app)
        .patch('/auth/reset-password')
        .set('Authorization', 'bearer ' + "1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImJjMGU0NjNlLTA2MDMtNDY1NS1iNTI0LTI1YWUwZTQ2MTNjNSIsIm5hbWUiOiJVc2VybmFtZSIsImVtYWlsIjoidXNlcmVtYWlsQGV4YW1wbGUuY29tIiwicGhvbmUiOiIwOTEyMzQ1Njc4OSIsImlzUGFpZCI6ZmFsc2UsInN0YXJ0RGF0ZSI6bnVsbCwiZXhwaXJlZERhdGUiOm51bGwsImlhdCI6MTY4MjA5MzEyMn0.HXxPp4issE6Kqzj8ekuOpAcZ_eXPNV_AOwGk_W12S5A")
        .send({
            newPassword: "4321",
            email: "useremailUTLMPX@example.com"
        })
        .expect(401)
        .then((response) => {
            expect(response.body).toEqual(
                {
                    status: 401,
                    message: "Invalid token!",
                    data: null
                }
            )
        })
    })

    it('GET / courses / unauthorized access', async () => {
        // return Request(app)
        // .get('/courses')
        // .expect(401)
        // .then((response) => {
        //     expect(response.body).toEqual(
        //         {
        //             status: 401,
        //             message: "Unthorizied access!",
        //             data: null
        //         }
        //     )
        // })
    })

    it('GET / courses / invalid token', async () => {
        // return Request(app)
        // .get('/courses')
        // .set('Authorization', 'bearer ' + "6IkpXVCJ9.eyJpZCI6ImJjMGU0NjNlLTA2MDMtNDY1NS1iNTI0LTI1YWUwZTQ2MTNjNSIsIm5hbWUiOiJVc2VybmFtZSIsImVtYWlsIjoidXNlcmVtYWlsQGV4YW1wbGUuY29tIiwicGhvbmUiOiIwOTEyMzQ1Njc4OSIsImlzUGFpZCI6ZmFsc2UsInN0YXJ0RGF0ZSI6bnVsbCwiZXhwaXJlZERhdGUiOm51bGwsImlhdCI6MTY4MjA5MzEyMn0.HXxPp4issE6Kqzj8ekuOpAcZ_eXPNV_AOwGk_W12S5A")
        // .expect(401)
        // .then((response) => {
        //     expect(response.body).toEqual(
        //         {
        //             status: 401,
        //             message: "Invalid token!",
        //             data: null
        //         }
        //     )
        // })
    })

    it('GET / types / unauthorized access', async () => {
        return Request(app)
        .get('/types')
        .expect(401)
        .then((response) => {
            expect(response.body).toEqual(
                {
                    status: 401,
                    message: "Unthorizied access!",
                    data: null
                }
            )
        })
    })

    it('GET / types / invalid token', async () => {
        return Request(app)
        .get('/types')
        .set('Authorization', 'bearer ' + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJlbWFpbEBleGFtcGxlLmNvbSIsImNvZGUiOiJCRjVDVkwiLCJyZXNldFBhc3N3b3JkVG9rZW4iOnRydWUsImlhdCI6MTY4MjE4Njk3M30.32L6hNHnjmTS06-kqG_51qtbtikjOC9zankN9rI4WhI")
        .expect(401)
        .then((response) => {
            expect(response.body).toEqual(
                {
                    status: 401,
                    message: "Invalid token!",
                    data: null
                }
            )
        })
    })

    it('GET / levels / unauthorized access', async () => {
        return Request(app)
        .get('/levels')
        .expect(401)
        .then((response) => {
            expect(response.body).toEqual(
                {
                    status: 401,
                    message: "Unthorizied access!",
                    data: null
                }
            )
        })
    })

    it('GET / levels / invalid token', async () => {
        return Request(app)
        .get('/levels')
        .set('Authorization', 'bearer ' + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJlbWFpbEBleGFtcGxlLmNvbSIsImNvZGUiOiJCRjVDVkwiLCJyZXNldFBhc3N3b3JkVG9rZW4iOnRydWUsImlhdCI6MTY4MjE4Njk3M30.32L6hNHnjmTS06-kqG_51qtbtikjOC9zankN9rI4WhI")
        .expect(401)
        .then((response) => {
            expect(response.body).toEqual(
                {
                    status: 401,
                    message: "Invalid token!",
                    data: null
                }
            )
        })
    })

    it('PATCH / edit user / unauthorized access', async () => {
        return Request(app)
        .patch('/user/f242dc2d-1328-420d-b0c6-3ad2458f1c15')
        .send({
            email: "editeduser@gmail.com",
            phone: "000000000",
            name: "editedusername"
        })
        .expect(401)
        .then((response) => {
            expect(response.body).toEqual(
                {
                    status: 401,
                    message: "Unthorizied access!",
                    data: null
                }
            )
        })
    })

    it('PATCH / edit user / invalid token', async () => {
        return Request(app)
        .patch('/user/f242dc2d-1328-420d-b0c6-3ad2458f1c15')
        .set('Authorization', 'bearer ' + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJlbWFpbEBleGFtcGxlLmNvbSIsImNvZGUiOiJCRjVDVkwiLCJyZXNldFBhc3N3b3JkVG9rZW4iOnRydWUsImlhdCI6MTY4MjE4Njk3M30.32L6hNHnjmTS06-kqG_51qtbtikjOC9zankN9rI4WhI")
        .send({
            email: "editeduser@gmail.com",
            phone: "000000000",
            name: "editedusername"
        })
        .expect(401)
        .then((response) => {
            expect(response.body).toEqual(
                {
                    status: 401,
                    message: "Invalid token!",
                    data: null
                }
            )
        })
    })
})