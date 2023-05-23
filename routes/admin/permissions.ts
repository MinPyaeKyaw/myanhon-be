import express from 'express';

import { createPermission, getPermissions } from '../../controllers/admin/permissionController';

const permissionRoutes = express.Router();

permissionRoutes.get('/permissions', getPermissions);

// just for development, remove later
permissionRoutes.post('/permission', createPermission);

export default permissionRoutes;