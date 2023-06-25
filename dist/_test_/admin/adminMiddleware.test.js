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
describe('admin middlewares', () => {
    it('POST / admin / reset password / unauthorized access', () => __awaiter(void 0, void 0, void 0, function* () {
        return (0, supertest_1.default)(__1.default)
            .post(process.env.API_PREFIX + '/admin/auth/reset-password')
            .send({
            email: "postman@test.com",
            newPassword: "12345"
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
    it('POST / user / reset password / invalid token', () => __awaiter(void 0, void 0, void 0, function* () {
        return (0, supertest_1.default)(__1.default)
            .post(process.env.API_PREFIX + '/admin/auth/reset-password')
            .set('Authorization', 'bearer ' + "1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImJjMGU0NjNlLTA2MDMtNDY1NS1iNTI0LTI1YWUwZTQ2MTNjNSIsIm5hbWUiOiJVc2VybmFtZSIsImVtYWlsIjoidXNlcmVtYWlsQGV4YW1wbGUuY29tIiwicGhvbmUiOiIwOTEyMzQ1Njc4OSIsImlzUGFpZCI6ZmFsc2UsInN0YXJ0RGF0ZSI6bnVsbCwiZXhwaXJlZERhdGUiOm51bGwsImlhdCI6MTY4MjA5MzEyMn0.HXxPp4issE6Kqzj8ekuOpAcZ_eXPNV_AOwGk_W12S5A")
            .send({
            email: "postman@test.com",
            newPassword: "12345"
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
});
