"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userJwtMiddleware_1 = require("../middlewares/userJwtMiddleware");
const trackingController_1 = require("../controllers/trackingController");
const trackingRouter = express_1.default.Router();
trackingRouter.post('/track-content', userJwtMiddleware_1.verifyUserJwt, trackingController_1.setContentTracking);
trackingRouter.post('/track-test', userJwtMiddleware_1.verifyUserJwt, trackingController_1.setTestTracking);
exports.default = trackingRouter;
