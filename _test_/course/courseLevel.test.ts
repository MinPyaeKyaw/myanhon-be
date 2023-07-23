import Request from 'supertest';
import app from '../..';

describe('Fetching levels', () => {
    it('GET / fetch levels', async () => {
        return Request(app)
        .get(process.env.API_PREFIX+'/levels')
        .set('Authorization', 'bearer ' + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImE0NmFjMjQ4LWJlNDEtNDUzNy1hNjRiLWM4ZDE2MzkwNmQ3MyIsIm5hbWUiOiJVc2VybmFtZSIsImVtYWlsIjoidXNlcmVtYWlsVVRMTVBYQGV4YW1wbGUuY29tIiwicGhvbmUiOiIwOTEyMzQ1Njc4OSIsImlzUGFpZCI6ZmFsc2UsInN0YXJ0RGF0ZSI6bnVsbCwiZXhwaXJlZERhdGUiOm51bGwsImlhdCI6MTY4MjE2MjQ2OX0.Vthi6-TmGgddEUxJIhSPTAYmdptJG8oVGezoSKx7qdA")
        .expect(200)
        .then((response) => {
            expect(response.body).toEqual({
                status: 200,
                message: "Successfully retrived!",
                data: expect.arrayContaining([
                    {
                        id: expect.any(String),
                        name: expect.any(String),
                        createdAt: expect.any(String),
                        updatedAt: expect.any(String)
                    }
                ])
            })
        })
    })
})