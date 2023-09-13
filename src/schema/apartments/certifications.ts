import { Schema } from 'mongoose';
import { Certifactions } from '../../models/apartments/certifications';
import { TimeStamp } from 'aws-sdk/clients/discovery';

export const CertifaciontsSchema = new Schema<
	Certifactions & Document & TimeStamp
>({
	certified_by: {
		type: [String],
		required: false,
	},
	description: {
		type: String,
		required: false,
	},
	description_logo: {
		type: String,
		required: false,
	},
	qr_images: {
		type: [String],
		required: false,
	},
});
