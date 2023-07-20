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
Object.defineProperty(exports, "__esModule", { value: true });
const functions_1 = require("../../utils/functions");
describe('payment', () => {
    it('GET / payment / get payment token', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(yield (0, functions_1.getPaymentToken)()).toEqual({
            code: "000",
            message: "Authentication Success",
            time: expect.any(String),
            response: {
                paymentToken: expect.any(String),
                expireIn: expect.any(String)
            }
        });
    }));
});
