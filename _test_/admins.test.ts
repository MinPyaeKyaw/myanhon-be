import Request from 'supertest';
import app from '..';

describe('admin list', () => {
    it('GET / admin / get admin list', async () => {
        return Request(app)
        .get(process.env.API_PREFIX+'/admin/admins')
        .expect(200)
        .then((response) => {
            expect(response.body).toEqual(
                {
                    status: 200,
                    message: "Successfully retrived!",
                    data: expect.arrayContaining([
                        {
                            id: expect.any(String),
                            name: expect.any(String),
                            email: expect.any(String),
                            hasLogin: expect.any(Boolean),
                            latestLogin: expect.any(String),
                            roleId: expect.any(String),
                            createdAt: expect.any(String),
                            updatedAt: expect.any(String)
                        }
                    ])
                }
            )
        })
    })

    it('GET / admin / get admin by ID', async () => {
        return Request(app)
        .get(process.env.API_PREFIX+'/admin/admins/f1960f34-4810-4753-9b9d-e5e38b4829d2')
        .expect(200)
        .then((response) => {
            expect(response.body).toEqual(
                {
                    status: 200,
                    message: "Successfully retrived!",
                    data: {
                        id: expect.any(String),
                        name: expect.any(String),
                        email: expect.any(String),
                        hasLogin: expect.any(Boolean),
                        latestLogin: expect.any(String),
                        roleId: expect.any(String),
                        createdAt: expect.any(String),
                        updatedAt: expect.any(String)
                    }
                }
            )
        })
    })

    it('GET / admin / get admin by ID / no data found', async () => {
        return Request(app)
        .get(process.env.API_PREFIX+'/admin/admins/f1960f34-4810-4753-9b9d-e5e38b4829d')
        .expect(404)
        .then((response) => {
            expect(response.body).toEqual(
                {
                    status: 404,
                    message: "No data found!",
                    data: null
                }
            )
        })
    })

    it('GET / admin / change role', async () => {
        return Request(app)
        .patch(process.env.API_PREFIX+'/admin/admins/f1960f34-4810-4753-9b9d-e5e38b4829d2/change-role')
        .send({
            roleId: 'baf77acc-69a5-4b0b-b89a-2c897c39ffa1'
        })
        .expect(200)
        .then((response) => {
            expect(response.body).toEqual(
                {
                    status: 200,
                    message: "Successfully changed!",
                    data: {
                        id: expect.any(String),
                        name: expect.any(String),
                        email: expect.any(String),
                        hasLogin: expect.any(Boolean),
                        latestLogin: expect.any(String),
                        roleId: expect.any(String),
                        createdAt: expect.any(String),
                        updatedAt: expect.any(String)
                    }
                }
            )
        })
    })
})