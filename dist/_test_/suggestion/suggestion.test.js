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
describe("Suggestion", () => {
    it("POST / submit suggestion", () => __awaiter(void 0, void 0, void 0, function* () {
        return (0, supertest_1.default)(__1.default)
            .post(process.env.API_PREFIX + "/suggestion")
            .send({
            title: "Title string",
            suggestion: "Suggestion string",
        })
            .expect(201)
            .then((response) => {
            expect(response.body).toEqual({
                status: 201,
                message: "Successfully submitted!",
                data: {
                    id: expect.any(String),
                    title: expect.any(String),
                    suggestion: expect.any(String),
                    createdAt: expect.any(String),
                    updatedAt: expect.any(String),
                },
            });
        });
    }));
});
