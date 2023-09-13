import { sendMail } from '../mail';
import { JobApplicationForm } from '../models/job_application.model';
import { JobApplicationModel } from '../schema/job_application.schema';

export async function SubmitJobApplications(form: JobApplicationForm) {
	sendMail(form);
	return new JobApplicationModel(form).save();
}

export async function GetAllJobApplications() {
	return JobApplicationModel.find({});
}
