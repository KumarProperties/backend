import Joi from 'joi';
import { JobApplicatonForm } from '../../models/job_applications/JobApplications';

export function ValidateJobForm(obj: any) {
	return Joi.object<JobApplicatonForm>({
		email: Joi.string().required(),
		first_name: Joi.string().required(),
		phone_number: Joi.string().required(),
		resume: Joi.string().required(),
	}).validate(obj);
}
