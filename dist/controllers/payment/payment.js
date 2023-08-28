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
exports.pay = void 0;
const client_1 = require("@prisma/client");
const axios_1 = __importDefault(require("axios"));
const functions_1 = require("../../utils/functions");
const prisma = new client_1.PrismaClient();
const pay = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const paymentPayload = {
            providerName: req.body.providerName,
            methodName: req.body.methodName,
            totalAmount: req.body.totalAmount,
            orderId: req.body.orderId,
            customerPhone: req.body.customerPhone,
            customerName: req.body.customerName,
            items: JSON.stringify(req.body.items),
        };
        const data = (0, functions_1.encryptPaymentPayload)(paymentPayload);
        const token = yield axios_1.default.get('https://staging.dinger.asia/payment-gateway-uat/api/token?projectName=sannkyi staging&apiKey=m7v9vlk.eaOE1x3k9FnSH-Wm6QtdM1xxcEs&merchantName=mtktest');
        const payload = new FormData();
        if (data) {
            payload.append('payload', data);
        }
        const status = yield axios_1.default.post('https://staging.dinger.asia/payment-gateway-uat/api/pay', payload, {
            headers: {
                Authorization: `Bearer ${token.data.response.paymentToken}`,
            },
        });
        return (0, functions_1.writeJsonRes)(res, 200, status.data, 'test payment!');
    }
    catch (error) {
        (0, functions_1.logError)(error, 'Payment Controller');
        return (0, functions_1.writeJsonRes)(res, 500, null, 'Internal Server Error!');
    }
});
exports.pay = pay;
