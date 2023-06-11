"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const roleController_1 = require("../../controllers/admin/roleController");
const roleRoutes = express_1.default.Router();
roleRoutes.get('/roles', roleController_1.getRoles);
roleRoutes.post('/roles/:roleId/add-permission', roleController_1.addPermissionToRole);
roleRoutes.post('/roles/:roleId/remove-permission', roleController_1.removePermissionFromRole);
roleRoutes.post('/role', roleController_1.createRole);
roleRoutes.patch('/roles/:id', roleController_1.updateRole);
roleRoutes.delete('/roles/:id', roleController_1.deleteRole);
exports.default = roleRoutes;
