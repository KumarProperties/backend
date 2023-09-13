import { Schema } from 'mongoose';

export interface ApartmentDocument {
	title: string;
	location: string;
}

export const ApartmentDocumentSchema = new Schema<ApartmentDocument & Document>(
	{
		title: {
			type: String,
			required: false,
		},
		location: {
			type: String,
			required: false,
		},
	}
);
