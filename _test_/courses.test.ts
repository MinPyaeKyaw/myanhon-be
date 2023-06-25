import Request from 'supertest';
import app from '..';

describe('Fetching courses', () => {
    it('GET / fetch courses', async () => {
        return Request(app)
        .get(process.env.API_PREFIX+'/courses')
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
                        duration: expect.any(Number),
                        createdAt: expect.any(String),
                        updatedAt: expect.any(String),
                        type: expect.any(String),
                        level: expect.any(String),
                        courseType: {
                            id: expect.any(String),
                            name: expect.any(String),
                            createdAt: expect.any(String),
                            updatedAt: expect.any(String),
                        },
                        courseLevel: {
                            id: expect.any(String),
                            name: expect.any(String),
                            createdAt: expect.any(String),
                            updatedAt: expect.any(String),
                        }
                    }
                ])
            })
        })
    })

    // it('GET / fetch courses / no record found', async () => {
    //     return Request(app)
    //     .get('/courses')
    //     .set('Authorization', 'bearer ' + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImE0NmFjMjQ4LWJlNDEtNDUzNy1hNjRiLWM4ZDE2MzkwNmQ3MyIsIm5hbWUiOiJVc2VybmFtZSIsImVtYWlsIjoidXNlcmVtYWlsVVRMTVBYQGV4YW1wbGUuY29tIiwicGhvbmUiOiIwOTEyMzQ1Njc4OSIsImlzUGFpZCI6ZmFsc2UsInN0YXJ0RGF0ZSI6bnVsbCwiZXhwaXJlZERhdGUiOm51bGwsImlhdCI6MTY4MjE2MjQ2OX0.Vthi6-TmGgddEUxJIhSPTAYmdptJG8oVGezoSKx7qdA")
    //     .expect(404)
    //     .then((response) => {
    //         expect(response.body).toEqual({
    //             status: 404,
    //             message: "No record found!",
    //             data: null
    //         })
    //     })
    // })

    it('GET / fetch courses by ID', async () => {
        // return Request(app)
        // .get('/courses/2f3261d5-3cb4-478c-86ed-c4157d37c160')
        // .set('Authorization', 'bearer ' + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImE0NmFjMjQ4LWJlNDEtNDUzNy1hNjRiLWM4ZDE2MzkwNmQ3MyIsIm5hbWUiOiJVc2VybmFtZSIsImVtYWlsIjoidXNlcmVtYWlsVVRMTVBYQGV4YW1wbGUuY29tIiwicGhvbmUiOiIwOTEyMzQ1Njc4OSIsImlzUGFpZCI6ZmFsc2UsInN0YXJ0RGF0ZSI6bnVsbCwiZXhwaXJlZERhdGUiOm51bGwsImlhdCI6MTY4MjE2MjQ2OX0.Vthi6-TmGgddEUxJIhSPTAYmdptJG8oVGezoSKx7qdA")
        // .expect(200)
        // .then((response) => {
        //     expect(response.body).toEqual({
        //         status: 200,
        //         message: "Successfully retrived!",
        //         data: {
        //             id: expect.any(String),
        //             name: expect.any(String),
        //             isPaid: expect.any(Boolean),
        //             duration: expect.any(Number),
        //             type: expect.any(String),
        //             level: expect.any(String),
        //             createdAt: expect.any(String),
        //             updatedAt: expect.any(String),
        //             contents: expect.arrayContaining([
        //                 {
        //                     id: expect.any(String),
        //                     name: expect.any(String),
        //                     url: expect.any(String),
        //                     isPublic: expect.any(Boolean),
        //                     completedPercent: expect.any(Number),
        //                     createdAt: expect.any(String),
        //                     updatedAt: expect.any(String)
        //                 }
        //             ])
        //         }
        //     })
        // })
    })

    it('GET / fetch courses by ID / data not found', async () => {
        // return Request(app)
        // .get('/courses/2f3261d5-3cb4-478c-86ed-c4157d37c160')
        // .set('Authorization', 'bearer ' + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImE0NmFjMjQ4LWJlNDEtNDUzNy1hNjRiLWM4ZDE2MzkwNmQ3MyIsIm5hbWUiOiJVc2VybmFtZSIsImVtYWlsIjoidXNlcmVtYWlsVVRMTVBYQGV4YW1wbGUuY29tIiwicGhvbmUiOiIwOTEyMzQ1Njc4OSIsImlzUGFpZCI6ZmFsc2UsInN0YXJ0RGF0ZSI6bnVsbCwiZXhwaXJlZERhdGUiOm51bGwsImlhdCI6MTY4MjE2MjQ2OX0.Vthi6-TmGgddEUxJIhSPTAYmdptJG8oVGezoSKx7qdA")
        // .expect(404)
        // .then((response) => {
        //     expect(response.body).toEqual({
        //         status: 404,
        //         message: "No data found!",
        //         data: null
        //     })
        // })
    })
})