import Request from 'supertest';
import app from '../..';
import { generateOTPCode } from '../../utils/functions';

describe('admin course', () => {
    // it('POST / admin / create course', async () => {
    //     const otp = generateOTPCode();
    //     return Request(app)
    //     .post(process.env.API_PREFIX+'/admin/create-course')
    //     .send({
    //         name: "Test Course"+otp,
    //         duration: 200,
    //         isPublic: false,
    //         type: "0c2a5b46-51a6-4c73-b427-126f1bd76299",
    //         level: "22752b5f-c16a-4ff5-88f7-0ef2366b16a5",
    //         contents: [
    //             {
    //                 name: "Test Content One",
    //                 url: "Test Content One URL",
    //                 thumbnail: "Test Content One Thumbnail",
    //                 isPublic: true
    //             },
    //             {
    //                 name: "Test Content Two",
    //                 url: "Test Content Two URL",
    //                 thumbnail: "Test Content Two Thumbnail",
    //                 isPublic: false
    //             }
    //         ]
    //     })
    //     .expect(201)
    //     .then((response) => {
    //         expect(response.body).toEqual(
    //             {
    //                 status: 201,
    //                 message: 'Successfully created!',
    //                 data: {
    //                     id: expect.any(String),
    //                     name: expect.any(String),
    //                     duration: expect.any(Number),
    //                     isPublic: expect.any(Boolean),
    //                     type: expect.any(String),
    //                     level: expect.any(String),
    //                     createdAt: expect.any(String),
    //                     updatedAt: expect.any(String)
    //                 }
    //             }
    //         )
    //     })
    // })

    it('POST / admin / create course / course already exist', async () => {
        return Request(app)
        .post(process.env.API_PREFIX+'/admin/create-course')
        .send({
            name: "Test Course",
            duration: 200,
            isPublic: false,
            type: "0c2a5b46-51a6-4c73-b427-126f1bd76299",
            level: "22752b5f-c16a-4ff5-88f7-0ef2366b16a5",
            contents: [
                {
                    name: "Test Content One",
                    url: "Test Content One URL",
                    thumbnail: "Test Content One Thumbnail",
                    isPublic: true
                },
                {
                    name: "Test Content Two",
                    url: "Test Content Two URL",
                    thumbnail: "Test Content Two Thumbnail",
                    isPublic: false
                }
            ]
        })
        .expect(400)
        .then((response) => {
            expect(response.body).toEqual(
                {
                    status: 400,
                    message: "This course is already existed!",
                    data: null
                }
            )
        })
    })
})