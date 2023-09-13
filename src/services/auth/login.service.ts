import { LoginBody } from '../../models/auth/login.model';
import { signUser } from '../../utils/jwt.util';
import { getRegistrationDetailsWithPassword } from './registration.service';

export async function login(body: LoginBody): Promise<string> {
	let details = await getRegistrationDetailsWithPassword(
		body.email,
		body.password
	);
	if (details) {
		return signUser(details);
	} else {
		throw new Error("User doesn't exists");
	}
}
