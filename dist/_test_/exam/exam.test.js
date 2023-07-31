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
describe("Exam", () => {
    it("GET / get exam", () => __awaiter(void 0, void 0, void 0, function* () {
        return (0, supertest_1.default)(__1.default)
            .get(process.env.API_PREFIX + "/exam?type=typeId&level=levelId")
            .expect(200)
            .then((response) => {
            expect(response.body).toEqual({
                status: 200,
                message: "Successfully retrived!",
                data: expect.arrayContaining([
                    {
                        id: expect.any(String),
                        name: expect.any(String),
                        examId: expect.any(String),
                        levelId: expect.any(String),
                        createdAt: expect.any(String),
                        updatedAt: expect.any(String),
                        questions: expect.arrayContaining([
                            {
                                id: expect.any(String),
                                question: expect.any(String),
                                sectionId: expect.any(String),
                                answers: expect.arrayContaining([
                                    {
                                        id: expect.any(String),
                                        answer: expect.any(String),
                                        isCorrect: expect.any(Boolean),
                                        questionId: expect.any(String),
                                        createdAt: expect.any(String),
                                        updatedAt: expect.any(String),
                                    },
                                ]),
                                createdAt: expect.any(String),
                                updatedAt: expect.any(String),
                            },
                        ]),
                    },
                ]),
            });
        });
    }));
    // it("POST / submit exam", async () => {
    //   return Request(app)
    //     .post(process.env.API_PREFIX + "/exam-submit")
    //     .send({
    //       payload: "string payload",
    //     })
    //     .expect(200)
    //     .then((response) => {
    //       expect(response.body).toEqual({
    //         status: 200,
    //         message: "Successfully submitted!",
    //         data: {
    //           id: expect.any(String),
    //           exam: expect.any(String),
    //           level: expect.any(String),
    //           result: expect.any(String),
    //           createdAt: expect.any(String),
    //           updatedAt: expect.any(String),
    //         },
    //       });
    //     });
    // });
});
