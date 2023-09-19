"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const formValidators_1 = require("../middlewares/validators/formValidators");
const userPolicies_1 = require("../middlewares/policies/userPolicies");
const userJwtMiddleware_1 = require("../middlewares/jwt/userJwtMiddleware");
const confirmPasswordJwtMiddleware_1 = require("../middlewares/jwt/confirmPasswordJwtMiddleware");
const userRouter = express_1.default.Router();
userRouter.patch('/user/:id', userJwtMiddleware_1.verifyUserJwt, formValidators_1.editUserProfileFormValidation, userPolicies_1.userEditProfilePolicy, userController_1.editUserById);
userRouter.patch('/user/:id/change-phone', confirmPasswordJwtMiddleware_1.verifyConfirmPasswordJwt, formValidators_1.changePhoneFormValidation, userPolicies_1.userChangePhonePolicy, userController_1.changePhoneNumber);
exports.default = userRouter;
