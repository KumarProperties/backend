import { NextFunction, Request, Response } from 'express';
import { register } from '../../services/auth/service.registration';
import { RegistrationBody } from '../../models/auth/registration';
import { UserData } from '../../models/auth/user_data';
import { LoginBody } from '../../models/auth/login';
import { validateRegistrationBody } from '../../validators/auth/registarion';

export function validateRegistration(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const { error, value } = validateRegistrationBody(req);

	if (error || !value) {
		res.status(400).send({ message: error?.details[0].message });
		return;
	}

	req.body = value;
	next();
}

export function registrationRoute(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		let value = req.body as RegistrationBody;

		const onRegistrationSuccess = (data: UserData): void => {
			req.body = {
				email: value.email,
				password: value.password,
			} as LoginBody;
			next();
		};

		register(value)
			.then(onRegistrationSuccess)
			.catch((err) => {
				res.status(400).send({ message: err });
			});
	} catch (e) {
		next(e);
	}
}
