"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const roleController_1 = require("../../controllers/admin/roleController");
const roleRoutes = express_1.default.Router();
roleRoutes.get('/roles', roleController_1.getRoles);
// just for development, remove later
roleRoutes.post('/role', roleController_1.createRole);
exports.default = roleRoutes;
