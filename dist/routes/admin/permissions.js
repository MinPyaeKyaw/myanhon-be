"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const permissionController_1 = require("../../controllers/admin/permissionController");
const permissionRoutes = express_1.default.Router();
permissionRoutes.get('/permissions', permissionController_1.getPermissions);
// just for development, remove later
permissionRoutes.post('/permission', permissionController_1.createPermission);
exports.default = permissionRoutes;
