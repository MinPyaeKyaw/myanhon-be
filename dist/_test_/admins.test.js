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
const __1 = __importDefault(require(".."));
describe('admin list', () => {
    it('GET / admin / get admin list', () => __awaiter(void 0, void 0, void 0, function* () {
        return (0, supertest_1.default)(__1.default)
            .get(process.env.API_PREFIX + '/admin/admins')
            .expect(200)
            .then((response) => {
            expect(response.body).toEqual({
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
            });
        });
    }));
    it('GET / admin / get admin by ID', () => __awaiter(void 0, void 0, void 0, function* () {
        return (0, supertest_1.default)(__1.default)
            .get(process.env.API_PREFIX + '/admin/admins/f1960f34-4810-4753-9b9d-e5e38b4829d2')
            .expect(200)
            .then((response) => {
            expect(response.body).toEqual({
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
            });
        });
    }));
    it('GET / admin / get admin by ID / no data found', () => __awaiter(void 0, void 0, void 0, function* () {
        return (0, supertest_1.default)(__1.default)
            .get(process.env.API_PREFIX + '/admin/admins/f1960f34-4810-4753-9b9d-e5e38b4829d')
            .expect(404)
            .then((response) => {
            expect(response.body).toEqual({
                status: 404,
                message: "No data found!",
                data: null
            });
        });
    }));
    it('GET / admin / change role', () => __awaiter(void 0, void 0, void 0, function* () {
        return (0, supertest_1.default)(__1.default)
            .patch(process.env.API_PREFIX + '/admin/admins/f1960f34-4810-4753-9b9d-e5e38b4829d2/change-role')
            .send({
            roleId: 'baf77acc-69a5-4b0b-b89a-2c897c39ffa1'
        })
            .expect(200)
            .then((response) => {
            expect(response.body).toEqual({
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
            });
        });
    }));
});
