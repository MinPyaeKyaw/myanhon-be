import Request from 'supertest';
import app from '..';

describe('admin list', () => {
    it('GET / admin / get roles', async () => {
        return Request(app)
        .get(process.env.API_PREFIX+'/admin/roles')
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
                            createdAt: expect.any(String),
                            updatedAt: expect.any(String),
                            permissions: expect.arrayContaining([
                                {
                                    id: expect.any(String),
                                    name: expect.any(String),
                                    createdAt: expect.any(String),
                                    updatedAt: expect.any(String)
                                }
                            ])
                        }
                    ])
                }
            )
        })
    })

    // it('POST / admin / create role', async () => {
    //     return Request(app)
    //     .post(process.env.API_PREFIX+'/admin/role')
    //     .send({
    //         name: 'test role'
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
    //                     createdAt: expect.any(String),
    //                     updatedAt: expect.any(String)
    //                 }
    //             }
    //         )
    //     })
    // })

    it('PATCH / admin / edit role', async () => {
        return Request(app)
        .patch(process.env.API_PREFIX+'/admin/roles/baf77acc-69a5-4b0b-b89a-2c897c39ffa1')
        .expect(200)
        .then((response) => {
            expect(response.body).toEqual(
                {
                    status: 200,
                    message: "Successfully updated!",
                    data: {
                        id: expect.any(String),
                        name: expect.any(String),
                        createdAt: expect.any(String),
                        updatedAt: expect.any(String)
                    }
                }
            )
        })
    })

    it('DELETE / admin / delete role', async () => {
        return Request(app)
        .delete(process.env.API_PREFIX+'/admin/roles/baf77acc-69a5-4b0b-b89a-2c897c39ffa1')
        .expect(200)
        .then((response) => {
            expect(response.body).toEqual(
                {
                    status: 200,
                    message: "Successfully deleted!",
                    data: null
                }
            )
        })
    })

    // it('POST / admin / add permission to role', async () => {
    //     return Request(app)
    //     .post(process.env.API_PREFIX+'/admin/roles/baf77acc-69a5-4b0b-b89a-2c897c39ffa1/add-permission')
    //     .send({
    //         permission: '09d12b87-883e-4478-96c9-aa985866e8ce'
    //     })
    //     .expect(200)
    //     .then((response) => {
    //         expect(response.body).toEqual(
    //             {
    //                 status: 200,
    //                 message: "Successfully added!",
    //                 data: null
    //             }
    //         )
    //     })
    // })

    it('POST / admin / add permission to role / permission already existed', async () => {
        return Request(app)
        .post(process.env.API_PREFIX+'/admin/roles/baf77acc-69a5-4b0b-b89a-2c897c39ffa1/add-permission')
        .send({
            permission: '297d3afc-9680-44d5-9542-cd1f86d77559'
        })
        .expect(400)
        .then((response) => {
            expect(response.body).toEqual(
                {
                    status: 400,
                    message: "Permission already existed!",
                    data: null
                }
            )
        })
    })

    it('DELETE / admin / remove permission from role', async () => {
        return Request(app)
        .post(process.env.API_PREFIX+'/admin/roles/baf77acc-69a5-4b0b-b89a-2c897c39ffa1/remove-permission')
        .send({
            permission: '09d12b87-883e-4478-96c9-aa985866e8ce'
        })
        .expect(200)
        .then((response) => {
            expect(response.body).toEqual(
                {
                    status: 200,
                    message: "Successfully deleted!",
                    data: null
                }
            )
        })
    })
})