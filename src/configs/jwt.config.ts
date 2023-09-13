import { SignOptions } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export let JwtSignOptions: SignOptions = {
	expiresIn: '1d',
};

export let JWTSecretKey = process.env.JWTSecretKey ?? '';
