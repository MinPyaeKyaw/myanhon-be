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
describe('Fetching types', () => {
    it('GET / fetch types', () => __awaiter(void 0, void 0, void 0, function* () {
        return (0, supertest_1.default)(__1.default)
            .get(process.env.API_PREFIX + '/types')
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
            });
        });
    }));
});
