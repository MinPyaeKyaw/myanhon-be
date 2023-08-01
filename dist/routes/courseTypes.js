"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const typeController_1 = require("../controllers/typeController");
const apiKeyMiddleware_1 = require("../middlewares/apiKeyMiddleware");
const typeRouter = express_1.default.Router();
typeRouter.get("/types", apiKeyMiddleware_1.apiKeyMiddleware, typeController_1.getTypes);
typeRouter.post("/type", typeController_1.createType);
exports.default = typeRouter;
