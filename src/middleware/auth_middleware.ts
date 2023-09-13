import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt_util';

export function validateToken(req: Request, res: Response, next: NextFunction) {
	try {
		console.log('Checking Auth token');
		const bearerHeader = req.headers['authorization']?.split(' ')[1];
		if (bearerHeader) {
			let payload = verifyToken(bearerHeader);
			// req.body["user"] = payload;
			next();
			return;
		}
		throw 'Token required';
	} catch (err) {
		res.status(400).send({ message: 'Token Error' });
	}
}
