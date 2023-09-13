import mongoose from 'mongoose';
import { JobApplicationForm } from '../models/job_application.model';

let JobApplicationSchema = new mongoose.Schema<JobApplicationForm>({
	first_name: {
		type: String,
		required: true,
	},
	phone_number: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	resume: {
		type: String,
		required: true,
	},
});

export let JobApplicationModel = mongoose.model<JobApplicationForm>(
	'job_applications',
	JobApplicationSchema
);
