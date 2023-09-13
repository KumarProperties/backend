import express from 'express';

import { loginRoute, validateLoginRoute } from '../controllers/auth/login';
import {
	registrationRoute,
	validateRegistration,
} from '../controllers/auth/registration';

export const AuthRouter = express.Router();

AuthRouter.post('/login', validateLoginRoute, loginRoute);
AuthRouter.post(
	'/registration',
	validateRegistration,
	registrationRoute,
	loginRoute
);
