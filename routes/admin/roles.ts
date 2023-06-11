import express from 'express';
import { addPermissionToRole, createRole, deleteRole, getRoles, removePermissionFromRole, updateRole } from '../../controllers/admin/roleController';

const roleRoutes = express.Router();

roleRoutes.get('/roles', getRoles);

roleRoutes.post('/roles/:roleId/add-permission', addPermissionToRole);

roleRoutes.post('/roles/:roleId/remove-permission', removePermissionFromRole);

roleRoutes.post('/role', createRole);

roleRoutes.patch('/roles/:id', updateRole);

roleRoutes.delete('/roles/:id', deleteRole);

export default roleRoutes;