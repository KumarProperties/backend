import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt.util';

export function validateToken(req: Request, res: Response, next: NextFunction) {
	try {
		// console.log('Checking Auth token');
		const token = req.headers['authorization']?.split(' ')[1];

		if (token) {
			let payload = verifyToken(token);

			// @ts-ignore
			req.payload = payload;

			next();
			return;
		}

		throw new Error('Token required');
	} catch (err) {
		res.status(400).send({ message: 'Token Error' });
	}
}
