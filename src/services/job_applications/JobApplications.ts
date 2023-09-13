import { sendMail } from '../../mail/mail';
import { JobApplicatonForm } from '../../models/job_applications/JobApplications';
import { JobApplicationModel } from '../../schema/job_applications/JobApplications';

export async function SubmitJobApplications(form: JobApplicatonForm) {
	sendMail(form);
	return new JobApplicationModel(form).save();
}

export async function GetAllJobApplications() {
	return JobApplicationModel.find({});
}
