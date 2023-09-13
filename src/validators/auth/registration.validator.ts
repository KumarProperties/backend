import { Request } from 'express';
import Joi from 'joi';
import { RegistrationBody } from '../../models/auth/registration.model';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const registrationSchema = Joi.object<RegistrationBody>({
	username: Joi.string().required(),
	email: Joi.string().regex(emailRegex).required(),
	name: Joi.string().required(),
	password: Joi.string().required(),
});

export function validateRegistrationBody(req: Request) {
	return registrationSchema.validate(req.body);
}
