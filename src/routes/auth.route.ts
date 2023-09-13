import express from 'express';

import {
	loginRoute,
	validateLoginRoute,
} from '../controllers/auth/login.controller';
import {
	registrationRoute,
	validateRegistration,
} from '../controllers/auth/registration.controller';

export const AuthRouter = express.Router();

AuthRouter.post('/login', validateLoginRoute, loginRoute);
AuthRouter.post(
	'/registration',
	validateRegistration,
	registrationRoute,
	loginRoute
);
