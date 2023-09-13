import mongoose from 'mongoose';
import { registrationSchema } from '../../schema/auth.schema';
import { RegistrationBody } from '../../models/auth/registration.model';
import { UserData } from '../../models/auth/user_data.model';

const RegistrationModel = mongoose.model('registrations', registrationSchema);

export async function register(data: RegistrationBody): Promise<UserData> {
	if (!(await checkIfUserExists(data.email))) {
		const model = {
			email: data.email,
			name: data.name,
			username: data.username,
			password: data.password,
		};

		let user = new RegistrationModel(model);
		user.isNew = true;
		let record = await user.save();

		return { ...model, user_id: record._id.toString() };
	}

	throw new Error('User already exists');
}

export async function checkIfUserExists(email: string): Promise<boolean> {
	return (await getRegistrationDetails(email)) !== undefined;
}

export async function getRegistrationDetails(
	email: string
): Promise<UserData | undefined> {
	let record = (await RegistrationModel.find({ email: email }))[0];

	if (!record) {
		return undefined;
	}

	return {
		name: record.email,
		email: record.name,
		user_id: record._id,
		username: record.username,
	};
}

export async function getRegistrationDetailsWithPassword(
	email: string,
	password: string
): Promise<UserData | undefined> {
	let record = await RegistrationModel.findOne({ email: email });

	// console.log('Login Test', record, email, password);
	if (!record || password !== record.password) {
		return undefined;
	}

	return {
		name: record.email,
		email: record.name,
		user_id: record._id,
		username: record.username,
	};
}
