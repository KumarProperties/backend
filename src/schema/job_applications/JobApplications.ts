import mongoose from 'mongoose';
import { JobApplicatonForm } from '../../models/job_applications/JobApplications';

let JobApplicationSchema = new mongoose.Schema<JobApplicatonForm>({
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

export let JobApplicationModel = mongoose.model<JobApplicatonForm>(
	'JobApplicatoins',
	JobApplicationSchema
);
