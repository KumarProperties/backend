import { JWTSecretKey, JwtSignOptions } from '../config/config.jwt';
import jwt, { JwtPayload } from 'jsonwebtoken';

export function verifyToken(token: string) {
	let result = jwt.verify(token, JWTSecretKey);
	return result as JwtPayload;
}

export function signUser(payload: JwtPayload) {
	return jwt.sign(payload, JWTSecretKey, JwtSignOptions);
}
