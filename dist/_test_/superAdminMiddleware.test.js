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
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
describe('admin middlewares', () => {
    it('GET / super admin / get roles / invalid token', () => __awaiter(void 0, void 0, void 0, function* () {
        return (0, supertest_1.default)(__1.default)
            .get(process.env.API_PREFIX + '/admin/roles')
            .set('Authorization', 'bearer ' + "1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImJjMGU0NjNlLTA2MDMtNDY1NS1iNTI0LTI1YWUwZTQ2MTNjNSIsIm5hbWUiOiJVc2VybmFtZSIsImVtYWlsIjoidXNlcmVtYWlsQGV4YW1wbGUuY29tIiwicGhvbmUiOiIwOTEyMzQ1Njc4OSIsImlzUGFpZCI6ZmFsc2UsInN0YXJ0RGF0ZSI6bnVsbCwiZXhwaXJlZERhdGUiOm51bGwsImlhdCI6MTY4MjA5MzEyMn0.HXxPp4issE6Kqzj8ekuOpAcZ_eXPNV_AOwGk_W12S5A")
            .expect(401)
            .then((response) => {
            expect(response.body).toEqual({
                status: 401,
                message: "Invalid token!",
                data: null
            });
        });
    }));
    it('GET / super admin / get roles / unauthorized access', () => __awaiter(void 0, void 0, void 0, function* () {
        return (0, supertest_1.default)(__1.default)
            .get(process.env.API_PREFIX + '/admin/roles')
            .expect(401)
            .then((response) => {
            expect(response.body).toEqual({
                status: 401,
                message: "Unthorizied access!",
                data: null
            });
        });
    }));
    it('POST / super admin / create role / invalid token', () => __awaiter(void 0, void 0, void 0, function* () {
        return (0, supertest_1.default)(__1.default)
            .post(process.env.API_PREFIX + '/admin/role')
            .set('Authorization', 'bearer ' + "1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImJjMGU0NjNlLTA2MDMtNDY1NS1iNTI0LTI1YWUwZTQ2MTNjNSIsIm5hbWUiOiJVc2VybmFtZSIsImVtYWlsIjoidXNlcmVtYWlsQGV4YW1wbGUuY29tIiwicGhvbmUiOiIwOTEyMzQ1Njc4OSIsImlzUGFpZCI6ZmFsc2UsInN0YXJ0RGF0ZSI6bnVsbCwiZXhwaXJlZERhdGUiOm51bGwsImlhdCI6MTY4MjA5MzEyMn0.HXxPp4issE6Kqzj8ekuOpAcZ_eXPNV_AOwGk_W12S5A")
            .send({
            name: "role name"
        })
            .expect(401)
            .then((response) => {
            expect(response.body).toEqual({
                status: 401,
                message: "Invalid token!",
                data: null
            });
        });
    }));
    it('POST / super admin / create role / unauthorized access', () => __awaiter(void 0, void 0, void 0, function* () {
        return (0, supertest_1.default)(__1.default)
            .post(process.env.API_PREFIX + '/admin/role')
            .send({
            name: "role name"
        })
            .expect(401)
            .then((response) => {
            expect(response.body).toEqual({
                status: 401,
                message: "Unthorizied access!",
                data: null
            });
        });
    }));
    it('POST / super admin / update role / invalid token', () => __awaiter(void 0, void 0, void 0, function* () {
        return (0, supertest_1.default)(__1.default)
            .patch(process.env.API_PREFIX + '/admin/roles/baf77acc-69a5-4b0b-b89a-2c897c39ffa1')
            .set('Authorization', 'bearer ' + "1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImJjMGU0NjNlLTA2MDMtNDY1NS1iNTI0LTI1YWUwZTQ2MTNjNSIsIm5hbWUiOiJVc2VybmFtZSIsImVtYWlsIjoidXNlcmVtYWlsQGV4YW1wbGUuY29tIiwicGhvbmUiOiIwOTEyMzQ1Njc4OSIsImlzUGFpZCI6ZmFsc2UsInN0YXJ0RGF0ZSI6bnVsbCwiZXhwaXJlZERhdGUiOm51bGwsImlhdCI6MTY4MjA5MzEyMn0.HXxPp4issE6Kqzj8ekuOpAcZ_eXPNV_AOwGk_W12S5A")
            .send({
            name: "role name"
        })
            .expect(401)
            .then((response) => {
            expect(response.body).toEqual({
                status: 401,
                message: "Invalid token!",
                data: null
            });
        });
    }));
    it('POST / super admin / update role / unauthorized access', () => __awaiter(void 0, void 0, void 0, function* () {
        return (0, supertest_1.default)(__1.default)
            .patch(process.env.API_PREFIX + '/admin/roles/baf77acc-69a5-4b0b-b89a-2c897c39ffa1')
            .send({
            name: "role name"
        })
            .expect(401)
            .then((response) => {
            expect(response.body).toEqual({
                status: 401,
                message: "Unthorizied access!",
                data: null
            });
        });
    }));
    it('POST / super admin / add permission to role / invalid token', () => __awaiter(void 0, void 0, void 0, function* () {
        return (0, supertest_1.default)(__1.default)
            .post(process.env.API_PREFIX + '/admin/roles/baf77acc-69a5-4b0b-b89a-2c897c39ffa1/add-permission')
            .set('Authorization', 'bearer ' + "1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImJjMGU0NjNlLTA2MDMtNDY1NS1iNTI0LTI1YWUwZTQ2MTNjNSIsIm5hbWUiOiJVc2VybmFtZSIsImVtYWlsIjoidXNlcmVtYWlsQGV4YW1wbGUuY29tIiwicGhvbmUiOiIwOTEyMzQ1Njc4OSIsImlzUGFpZCI6ZmFsc2UsInN0YXJ0RGF0ZSI6bnVsbCwiZXhwaXJlZERhdGUiOm51bGwsImlhdCI6MTY4MjA5MzEyMn0.HXxPp4issE6Kqzj8ekuOpAcZ_eXPNV_AOwGk_W12S5A")
            .send({
            permission: '297d3afc-9680-44d5-9542-cd1f86d77559'
        })
            .expect(401)
            .then((response) => {
            expect(response.body).toEqual({
                status: 401,
                message: "Invalid token!",
                data: null
            });
        });
    }));
    it('POST / super admin / add permission to role / unauthorized access', () => __awaiter(void 0, void 0, void 0, function* () {
        return (0, supertest_1.default)(__1.default)
            .post(process.env.API_PREFIX + '/admin/roles/baf77acc-69a5-4b0b-b89a-2c897c39ffa1/add-permission')
            .send({
            permission: '297d3afc-9680-44d5-9542-cd1f86d77559'
        })
            .expect(401)
            .then((response) => {
            expect(response.body).toEqual({
                status: 401,
                message: "Unthorizied access!",
                data: null
            });
        });
    }));
    it('POST / super admin / remove permission to role / invalid token', () => __awaiter(void 0, void 0, void 0, function* () {
        return (0, supertest_1.default)(__1.default)
            .post(process.env.API_PREFIX + '/admin/roles/baf77acc-69a5-4b0b-b89a-2c897c39ffa1/remove-permission')
            .set('Authorization', 'bearer ' + "1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImJjMGU0NjNlLTA2MDMtNDY1NS1iNTI0LTI1YWUwZTQ2MTNjNSIsIm5hbWUiOiJVc2VybmFtZSIsImVtYWlsIjoidXNlcmVtYWlsQGV4YW1wbGUuY29tIiwicGhvbmUiOiIwOTEyMzQ1Njc4OSIsImlzUGFpZCI6ZmFsc2UsInN0YXJ0RGF0ZSI6bnVsbCwiZXhwaXJlZERhdGUiOm51bGwsImlhdCI6MTY4MjA5MzEyMn0.HXxPp4issE6Kqzj8ekuOpAcZ_eXPNV_AOwGk_W12S5A")
            .send({
            permission: '297d3afc-9680-44d5-9542-cd1f86d77559'
        })
            .expect(401)
            .then((response) => {
            expect(response.body).toEqual({
                status: 401,
                message: "Invalid token!",
                data: null
            });
        });
    }));
    it('POST / super admin / remove permission to role / unauthorized access', () => __awaiter(void 0, void 0, void 0, function* () {
        return (0, supertest_1.default)(__1.default)
            .post(process.env.API_PREFIX + '/admin/roles/baf77acc-69a5-4b0b-b89a-2c897c39ffa1/remove-permission')
            .send({
            permission: '297d3afc-9680-44d5-9542-cd1f86d77559'
        })
            .expect(401)
            .then((response) => {
            expect(response.body).toEqual({
                status: 401,
                message: "Unthorizied access!",
                data: null
            });
        });
    }));
});
