import { JWTSecretKey, JwtSignOptions } from '../configs/jwt.config';
import jwt, { JwtPayload } from 'jsonwebtoken';

export function verifyToken(token: string) {
	let result = jwt.verify(token, JWTSecretKey);
	return result as JwtPayload;
}

export function signUser(payload: JwtPayload) {
	return jwt.sign(payload, JWTSecretKey, JwtSignOptions);
}
