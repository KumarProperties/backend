import { Request } from 'express';
import Joi from 'joi';
import { LoginBody } from '../../models/auth/login.model';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const loginSchema = Joi.object<LoginBody>({
	email: Joi.string().regex(emailRegex).required(),
	password: Joi.string().required(),
});

export function validateLoginRequest(request: Request) {
	return loginSchema.validate(request.body);
}
