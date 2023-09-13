import { LoginBody } from '../../models/auth/login';
import { signUser } from '../../utils/jwt_util';
import {
	getRegistrationDetails,
	getRegistrationDetailsWithPassword,
} from './service.registration';

export async function login(body: LoginBody): Promise<string> {
	let details = await getRegistrationDetailsWithPassword(
		body.email,
		body.password
	);
	if (details) {
		return signUser(details);
	} else {
		throw "User doesn't exists";
	}
}
