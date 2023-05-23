import express from 'express';
import { createRole, getRoles } from '../../controllers/admin/roleController';

const roleRoutes = express.Router();

roleRoutes.get('/roles', getRoles);

// just for development, remove later
roleRoutes.post('/role', createRole);

export default roleRoutes;