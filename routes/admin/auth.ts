import express from 'express';
import { createAdmin, inviteAdmin, login, test } from '../../controllers/admin/authController';

const adminAuthRoute = express.Router();

adminAuthRoute.get('/test', test);

adminAuthRoute.post('/login', login);

adminAuthRoute.post('/create-admin', createAdmin);

adminAuthRoute.post('/invite-admin', inviteAdmin);

export default adminAuthRoute;