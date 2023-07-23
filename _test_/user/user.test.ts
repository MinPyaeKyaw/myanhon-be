import Request from 'supertest';
import app from '../..';

describe('User', () => {
    it('PATCH / edit user', async () => {
        return Request(app)
        .patch(process.env.API_PREFIX+'/user/f242dc2d-1328-420d-b0c6-3ad2458f1c15')
        .set('Authorization', 'bearer ' + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImE0NmFjMjQ4LWJlNDEtNDUzNy1hNjRiLWM4ZDE2MzkwNmQ3MyIsIm5hbWUiOiJVc2VybmFtZSIsImVtYWlsIjoidXNlcmVtYWlsVVRMTVBYQGV4YW1wbGUuY29tIiwicGhvbmUiOiIwOTEyMzQ1Njc4OSIsImlzUGFpZCI6ZmFsc2UsInN0YXJ0RGF0ZSI6bnVsbCwiZXhwaXJlZERhdGUiOm51bGwsImlhdCI6MTY4MjE2MjQ2OX0.Vthi6-TmGgddEUxJIhSPTAYmdptJG8oVGezoSKx7qdA")
        .send({
            email: "editeduser@gmail.com",
            phone: "000000000",
            name: "editedusername"
        })
        .expect(200)
        .then((response) => {
            expect(response.body).toEqual({
                status: 200,
                message: "Successfully edited your info!",
                data: {
                    token: expect.any(String)
                }
            })
        })
    })

    it('PATCH / edit user / user not found', async () => {
        return Request(app)
        .patch(process.env.API_PREFIX+'/user/f242dc2d-1328-420d-b0c6-3ad2458f1hj5')
        .set('Authorization', 'bearer ' + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImE0NmFjMjQ4LWJlNDEtNDUzNy1hNjRiLWM4ZDE2MzkwNmQ3MyIsIm5hbWUiOiJVc2VybmFtZSIsImVtYWlsIjoidXNlcmVtYWlsVVRMTVBYQGV4YW1wbGUuY29tIiwicGhvbmUiOiIwOTEyMzQ1Njc4OSIsImlzUGFpZCI6ZmFsc2UsInN0YXJ0RGF0ZSI6bnVsbCwiZXhwaXJlZERhdGUiOm51bGwsImlhdCI6MTY4MjE2MjQ2OX0.Vthi6-TmGgddEUxJIhSPTAYmdptJG8oVGezoSKx7qdA")
        .send({
            email: "editeduser@gmail.com",
            phone: "000000000",
            name: "editedusername"
        })
        .expect(404)
        .then((response) => {
            expect(response.body).toEqual({
                status: 404,
                message: "User not found!",
                data: null
            })
        })
    })

    it('POST / user tracking / upsert', async () => {
        return Request(app)
        .post(process.env.API_PREFIX+'/user/d0f29116-a4bd-4d8b-9259-6e79ff6c5e9c')
        .send({
            contentId: 'e274a908-30a1-4a31-9dd4-8b2af03cf21f',
            completedPercent: 54
        })
        .set('Authorization', 'bearer ' + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImE0NmFjMjQ4LWJlNDEtNDUzNy1hNjRiLWM4ZDE2MzkwNmQ3MyIsIm5hbWUiOiJVc2VybmFtZSIsImVtYWlsIjoidXNlcmVtYWlsVVRMTVBYQGV4YW1wbGUuY29tIiwicGhvbmUiOiIwOTEyMzQ1Njc4OSIsImlzUGFpZCI6ZmFsc2UsInN0YXJ0RGF0ZSI6bnVsbCwiZXhwaXJlZERhdGUiOm51bGwsImlhdCI6MTY4MjE2MjQ2OX0.Vthi6-TmGgddEUxJIhSPTAYmdptJG8oVGezoSKx7qdA")
        .expect(200)
        .then((response) => {
            expect(response.body).toEqual({
                status: 200,
                message: 'Successfully set user tracking!',
                data: null
            })
        })
    })
})