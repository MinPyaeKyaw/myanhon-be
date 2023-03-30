"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
console.log(prisma);
app.get('/', (req, res) => {
    res.send("Hello express with typescript!");
});
app.get('/hi', (req, res) => {
    res.send("Lee Pl");
});
app.listen(1337, () => {
    console.log("now listening to 1337");
});
