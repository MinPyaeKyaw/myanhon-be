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
exports.login = void 0;
const functions_1 = require("../utils/functions");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = {
        id: "uuid",
        name: "Sai Min Pyae Kyaw",
        email: "saiminpyaekyaw@gmail.com",
        phone: "09899587877",
        photo: "saiminpyaekyaw.png",
        isPaid: true,
        startDate: "start date",
        endDate: "end date",
        token: "this is token"
    };
    res.json((0, functions_1.response)(200, data, "Successfully logged in!"));
});
exports.login = login;
