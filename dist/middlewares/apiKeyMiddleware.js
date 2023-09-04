"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiKeyMiddleware = void 0;
const functions_1 = require("../utils/functions");
function apiKeyMiddleware(req, res, next) {
    const apiKey = req.headers['x-api-key'];
    if (apiKey !== process.env.API_KEY) {
        return (0, functions_1.writeJsonRes)(res, 404, null, '404 Not Found');
    }
    next();
}
exports.apiKeyMiddleware = apiKeyMiddleware;
