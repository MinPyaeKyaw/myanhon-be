"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const suggestion_1 = require("../controllers/suggestion");
const userJwtMiddleware_1 = require("../middlewares/userJwtMiddleware");
const suggestionRouter = express_1.default.Router();
suggestionRouter.post('/suggestion', userJwtMiddleware_1.verifyUserJwt, suggestion_1.submitSuggestion);
exports.default = suggestionRouter;
