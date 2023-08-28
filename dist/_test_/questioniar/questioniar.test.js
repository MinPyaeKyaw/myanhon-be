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
describe('Fetching questioniar', () => {
    it('GET / fetch questions', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(__1.default)
            .get(process.env.API_PREFIX + '/questioniars')
            .expect(200)
            .then(response => {
            expect(response.body).toEqual({
                status: 200,
                message: 'Successfully retrived!',
                data: expect.arrayContaining([
                    {
                        id: expect.any(String),
                        question: expect.any(String),
                        answers: expect.arrayContaining([
                            {
                                id: expect.any(String),
                                answer: expect.any(String),
                                count: expect.any(Number),
                                questionId: expect.any(String),
                                createdAt: expect.any(String),
                                updatedAt: expect.any(String),
                            },
                        ]),
                        createdAt: expect.any(String),
                        updatedAt: expect.any(String),
                    },
                ]),
            });
        });
    }));
    it('POST / submit questioniar', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)(__1.default)
            .post(process.env.API_PREFIX + '/questioniar-submit')
            .send({
            payload: [
                'c296f6b5-7114-43d4-a895-3f6daabd99fb',
                'bf7d79ed-61b4-4377-88d4-79a965bc7d0e',
            ],
        })
            .expect(200)
            .then(response => {
            expect(response.body).toEqual({
                status: 200,
                message: 'Successfully submitted!',
                data: null,
            });
        });
    }));
});
