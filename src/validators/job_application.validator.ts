import Joi from 'joi';
import { JobApplicationForm } from '../models/job_application.model';

export function ValidateJobForm(obj: any) {
	return Joi.object<JobApplicationForm>({
		email: Joi.string().required(),
		first_name: Joi.string().required(),
		phone_number: Joi.string().required(),
		resume: Joi.string().required(),
	}).validate(obj);
}
