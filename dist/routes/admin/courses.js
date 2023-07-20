"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const courseController_1 = require("../../controllers/admin/courseController");
const functions_1 = require("../../utils/functions");
// const uploadFile = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, 'uploads/');
//     },
//     filename: (req, file, cb) => {
//       cb(null, Date.now() + '-' + file.originalname);
//     }
// });
const adminCourseRoute = express_1.default.Router();
adminCourseRoute.post('/test-upload', (0, functions_1.uploadFile)().single('file'), courseController_1.testUpload);
adminCourseRoute.post('/create-course', courseController_1.createCourse);
adminCourseRoute.post('/courses/:courseId/add-content', courseController_1.addContent);
adminCourseRoute.post('/courses/:courseId/remove-content', courseController_1.removeContent);
adminCourseRoute.post('/courses/:courseId/add-instructor', courseController_1.addInstructor);
adminCourseRoute.post('/courses/:courseId/remove-instructor', courseController_1.removeInstructor);
exports.default = adminCourseRoute;
