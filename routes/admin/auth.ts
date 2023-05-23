import express from 'express';
import { checkEmail, createAdmin, inviteAdmin, login, resetPassword, test, verfiyCode } from '../../controllers/admin/authController';

const adminAuthRoute = express.Router();

adminAuthRoute.get('/test', test);

adminAuthRoute.post('/login', login);

adminAuthRoute.post('/create-admin', createAdmin);

adminAuthRoute.post('/invite-admin', inviteAdmin);

adminAuthRoute.post('/check-email', checkEmail);

adminAuthRoute.post('/verify-code', verfiyCode);

adminAuthRoute.post('/reset-password', resetPassword);

export default adminAuthRoute;