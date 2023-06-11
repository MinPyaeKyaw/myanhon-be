"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admins_1 = require("../../controllers/admin/admins");
const adminRoutes = express_1.default.Router();
adminRoutes.get('/admins', admins_1.getAdmins);
adminRoutes.get('/admins/:id', admins_1.getAdminById);
adminRoutes.patch('/admins/:id/change-role', admins_1.changeRole);
exports.default = adminRoutes;
