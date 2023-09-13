import { NextFunction, Request, Response } from 'express';
import {
	GetAllJobApplications,
	SubmitJobApplications,
} from '../services/job_application.service';
import { ValidateJobForm } from '../validators/job_application.validator';

import { toPublicUrl } from '../utils/aws.util';

export async function ResumeUploadRoute(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		if (!req.files) {
			res.status(400).send('files required');
			return;
		}

		let files = (req.files as any[])?.map((it) => {
			return toPublicUrl(it.location);
		});
		req.body.resume = files[0];

		const { value, error } = ValidateJobForm(req.body);

		if (error || !value) {
			return res.status(400).json({
				message: error?.details[0].message ?? 'Invalid Input',
			});
		}

		SubmitJobApplications(value);

		res.status(200).send('ok');
	} catch (e) {
		next(e);
	}
}

export async function GetResumes(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		res.status(200).send({
			applications: await GetAllJobApplications(),
		});
	} catch (e) {
		next(e);
	}
}
