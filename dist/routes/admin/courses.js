"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const courseController_1 = require("../../controllers/admin/courseController");
const adminCourseRoute = express_1.default.Router();
adminCourseRoute.post('/create-course', courseController_1.createCourse);
exports.default = adminCourseRoute;
