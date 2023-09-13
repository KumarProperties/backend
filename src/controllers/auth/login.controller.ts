import { NextFunction, Request, Response } from 'express';
import { validateLoginRequest } from '../../validators/auth/login.validator';
import { login } from '../../services/auth/login.service';
import { LoginBody } from '../../models/auth/login.model';

export async function validateLoginRoute(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const { error, value } = validateLoginRequest(req);

	if (error || !value) {
		res.status(400).json({
			error: error?.details[0]?.message,
		});
		return;
	}

	req.body = value;

	next();
}

export async function loginRoute(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		let token = await login(req.body as LoginBody);
		res.status(200).send({ token: token });
	} catch (e) {
		res.status(400).send({ message: e });
	}
}
