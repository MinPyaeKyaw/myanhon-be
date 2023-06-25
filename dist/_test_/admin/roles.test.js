"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const __1 = __importDefault(require("../.."));
describe('admin list', () => {
    it('GET / admin / get roles', () => __awaiter(void 0, void 0, void 0, function* () {
        return (0, supertest_1.default)(__1.default)
            .get(process.env.API_PREFIX + '/admin/roles')
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
            });
        });
    }));
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
    it('PATCH / admin / edit role', () => __awaiter(void 0, void 0, void 0, function* () {
        return (0, supertest_1.default)(__1.default)
            .patch(process.env.API_PREFIX + '/admin/roles/baf77acc-69a5-4b0b-b89a-2c897c39ffa1')
            .expect(200)
            .then((response) => {
            expect(response.body).toEqual({
                status: 200,
                message: "Successfully updated!",
                data: {
                    id: expect.any(String),
                    name: expect.any(String),
                    createdAt: expect.any(String),
                    updatedAt: expect.any(String)
                }
            });
        });
    }));
    it('DELETE / admin / delete role', () => __awaiter(void 0, void 0, void 0, function* () {
        return (0, supertest_1.default)(__1.default)
            .delete(process.env.API_PREFIX + '/admin/roles/baf77acc-69a5-4b0b-b89a-2c897c39ffa1')
            .expect(200)
            .then((response) => {
            expect(response.body).toEqual({
                status: 200,
                message: "Successfully deleted!",
                data: null
            });
        });
    }));
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
    it('POST / admin / add permission to role / permission already existed', () => __awaiter(void 0, void 0, void 0, function* () {
        return (0, supertest_1.default)(__1.default)
            .post(process.env.API_PREFIX + '/admin/roles/baf77acc-69a5-4b0b-b89a-2c897c39ffa1/add-permission')
            .send({
            permission: '297d3afc-9680-44d5-9542-cd1f86d77559'
        })
            .expect(400)
            .then((response) => {
            expect(response.body).toEqual({
                status: 400,
                message: "Permission already existed!",
                data: null
            });
        });
    }));
    it('DELETE / admin / remove permission from role', () => __awaiter(void 0, void 0, void 0, function* () {
        return (0, supertest_1.default)(__1.default)
            .post(process.env.API_PREFIX + '/admin/roles/baf77acc-69a5-4b0b-b89a-2c897c39ffa1/remove-permission')
            .send({
            permission: '09d12b87-883e-4478-96c9-aa985866e8ce'
        })
            .expect(200)
            .then((response) => {
            expect(response.body).toEqual({
                status: 200,
                message: "Successfully deleted!",
                data: null
            });
        });
    }));
});
