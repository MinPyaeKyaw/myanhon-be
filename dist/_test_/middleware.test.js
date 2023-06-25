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
describe('middlewares', () => {
    it('POST / user / reset password / unauthorized access', () => __awaiter(void 0, void 0, void 0, function* () {
        return (0, supertest_1.default)(__1.default)
            .patch(process.env.API_PREFIX + '/auth/reset-password')
            .send({
            newPassword: "4321",
            email: "useremailUTLMPX@example.com"
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
            .patch(process.env.API_PREFIX + '/auth/reset-password')
            .set('Authorization', 'bearer ' + "1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImJjMGU0NjNlLTA2MDMtNDY1NS1iNTI0LTI1YWUwZTQ2MTNjNSIsIm5hbWUiOiJVc2VybmFtZSIsImVtYWlsIjoidXNlcmVtYWlsQGV4YW1wbGUuY29tIiwicGhvbmUiOiIwOTEyMzQ1Njc4OSIsImlzUGFpZCI6ZmFsc2UsInN0YXJ0RGF0ZSI6bnVsbCwiZXhwaXJlZERhdGUiOm51bGwsImlhdCI6MTY4MjA5MzEyMn0.HXxPp4issE6Kqzj8ekuOpAcZ_eXPNV_AOwGk_W12S5A")
            .send({
            newPassword: "4321",
            email: "useremailUTLMPX@example.com"
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
    it('GET / courses / unauthorized access', () => __awaiter(void 0, void 0, void 0, function* () {
        // return Request(app)
        // .get('/courses')
        // .expect(401)
        // .then((response) => {
        //     expect(response.body).toEqual(
        //         {
        //             status: 401,
        //             message: "Unthorizied access!",
        //             data: null
        //         }
        //     )
        // })
    }));
    it('GET / courses / invalid token', () => __awaiter(void 0, void 0, void 0, function* () {
        // return Request(app)
        // .get('/courses')
        // .set('Authorization', 'bearer ' + "6IkpXVCJ9.eyJpZCI6ImJjMGU0NjNlLTA2MDMtNDY1NS1iNTI0LTI1YWUwZTQ2MTNjNSIsIm5hbWUiOiJVc2VybmFtZSIsImVtYWlsIjoidXNlcmVtYWlsQGV4YW1wbGUuY29tIiwicGhvbmUiOiIwOTEyMzQ1Njc4OSIsImlzUGFpZCI6ZmFsc2UsInN0YXJ0RGF0ZSI6bnVsbCwiZXhwaXJlZERhdGUiOm51bGwsImlhdCI6MTY4MjA5MzEyMn0.HXxPp4issE6Kqzj8ekuOpAcZ_eXPNV_AOwGk_W12S5A")
        // .expect(401)
        // .then((response) => {
        //     expect(response.body).toEqual(
        //         {
        //             status: 401,
        //             message: "Invalid token!",
        //             data: null
        //         }
        //     )
        // })
    }));
    it('GET / types / unauthorized access', () => __awaiter(void 0, void 0, void 0, function* () {
        return (0, supertest_1.default)(__1.default)
            .get(process.env.API_PREFIX + '/types')
            .expect(401)
            .then((response) => {
            expect(response.body).toEqual({
                status: 401,
                message: "Unthorizied access!",
                data: null
            });
        });
    }));
    it('GET / types / invalid token', () => __awaiter(void 0, void 0, void 0, function* () {
        return (0, supertest_1.default)(__1.default)
            .get(process.env.API_PREFIX + '/types')
            .set('Authorization', 'bearer ' + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJlbWFpbEBleGFtcGxlLmNvbSIsImNvZGUiOiJCRjVDVkwiLCJyZXNldFBhc3N3b3JkVG9rZW4iOnRydWUsImlhdCI6MTY4MjE4Njk3M30.32L6hNHnjmTS06-kqG_51qtbtikjOC9zankN9rI4WhI")
            .expect(401)
            .then((response) => {
            expect(response.body).toEqual({
                status: 401,
                message: "Invalid token!",
                data: null
            });
        });
    }));
    it('GET / levels / unauthorized access', () => __awaiter(void 0, void 0, void 0, function* () {
        return (0, supertest_1.default)(__1.default)
            .get(process.env.API_PREFIX + '/levels')
            .expect(401)
            .then((response) => {
            expect(response.body).toEqual({
                status: 401,
                message: "Unthorizied access!",
                data: null
            });
        });
    }));
    it('GET / levels / invalid token', () => __awaiter(void 0, void 0, void 0, function* () {
        return (0, supertest_1.default)(__1.default)
            .get(process.env.API_PREFIX + '/levels')
            .set('Authorization', 'bearer ' + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJlbWFpbEBleGFtcGxlLmNvbSIsImNvZGUiOiJCRjVDVkwiLCJyZXNldFBhc3N3b3JkVG9rZW4iOnRydWUsImlhdCI6MTY4MjE4Njk3M30.32L6hNHnjmTS06-kqG_51qtbtikjOC9zankN9rI4WhI")
            .expect(401)
            .then((response) => {
            expect(response.body).toEqual({
                status: 401,
                message: "Invalid token!",
                data: null
            });
        });
    }));
    it('PATCH / edit user / unauthorized access', () => __awaiter(void 0, void 0, void 0, function* () {
        return (0, supertest_1.default)(__1.default)
            .patch(process.env.API_PREFIX + '/user/f242dc2d-1328-420d-b0c6-3ad2458f1c15')
            .send({
            email: "editeduser@gmail.com",
            phone: "000000000",
            name: "editedusername"
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
    it('PATCH / edit user / invalid token', () => __awaiter(void 0, void 0, void 0, function* () {
        return (0, supertest_1.default)(__1.default)
            .patch(process.env.API_PREFIX + '/user/f242dc2d-1328-420d-b0c6-3ad2458f1c15')
            .set('Authorization', 'bearer ' + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJlbWFpbEBleGFtcGxlLmNvbSIsImNvZGUiOiJCRjVDVkwiLCJyZXNldFBhc3N3b3JkVG9rZW4iOnRydWUsImlhdCI6MTY4MjE4Njk3M30.32L6hNHnjmTS06-kqG_51qtbtikjOC9zankN9rI4WhI")
            .send({
            email: "editeduser@gmail.com",
            phone: "000000000",
            name: "editedusername"
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
