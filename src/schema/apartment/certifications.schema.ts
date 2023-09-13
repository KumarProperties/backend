import { Schema } from 'mongoose';
import { TimeStamp } from 'aws-sdk/clients/discovery';

import { Certifications } from '../../models/apartments/certifications.model';

export const CertificationsSchema = new Schema<
	Certifications & Document & TimeStamp
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
