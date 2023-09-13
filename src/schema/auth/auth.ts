import mongoose, { Document } from 'mongoose';

interface RegistrationSchema {
	name: string;
	email: string;
	username: string;
	password: string;
}

export const registrationSchema = new mongoose.Schema<
	RegistrationSchema & {
		updatedAt: Date;
		createdAt: Date;
		__v: number;
	} & Document
>(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		username: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
	},
	{
		validateBeforeSave: true,
	}
);
