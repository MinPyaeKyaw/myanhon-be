"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userJwtMiddleware_1 = require("../middlewares/userJwtMiddleware");
const trackingController_1 = require("../controllers/trackingController");
const formValidators_1 = require("../middlewares/validators/formValidators");
const trackingRouter = express_1.default.Router();
trackingRouter.post('/track-content', formValidators_1.contentTrackingValidation, userJwtMiddleware_1.verifyUserJwt, trackingController_1.setContentTracking);
trackingRouter.post('/track-test', formValidators_1.testTrackingValidation, userJwtMiddleware_1.verifyUserJwt, trackingController_1.setTestTracking);
exports.default = trackingRouter;
