import nodemailer from 'nodemailer';

import { JobApplicationForm } from '../models/job_application.model';

const mailHTMLTemplate = (application: JobApplicationForm) =>
	`<!DOCTYPE html>
<html>
<head>
    <title>Job Application</title>
</head>
<body>
    <h2>Job Application</h2>
    <p>New Application from</p>
    <ul>
        <li>Name: ${application.first_name}</li>
        <li>Email:${application.email}</li>
        <li>Phone Number: ${application.phone_number}</li>
        <li>Attached Resume: ${application.resume} </li>
    </ul>
    <p>This is an auto generated email</p>
    <p>Thank you,</p>
    <p>Best regards,</p>
</body>
</html>`;

export async function sendMail(application: JobApplicationForm): Promise<void> {
	console.log('email_cred', {
		host: process.env.EMAIL_HOST,
		secure: false,
		auth: {
			user: process.env.EMAIL,
			pass: process.env.EMAIL_PASSWORD,
		},
		port: process.env.EMAIL_PORT,
	});

	return new Promise((resolve, reject) => {
		nodemailer
			.createTransport({
				host: process.env.EMAIL_HOST,
				secure: false,
				auth: {
					user: process.env.EMAIL,
					pass: process.env.EMAIL_PASSWORD,
				},
				port: process.env.EMAIL_PORT,
			} as any)
			.sendMail(
				{
					from: process.env.EMAIL,
					to: process.env.EMAIL_TO,
					subject: 'Job Application Email',
					html: mailHTMLTemplate(application),
				},
				(error, info) => {
					if (error) {
						// console.log(error);
						reject(error);
					} else {
						// console.log(info);
						resolve();
					}
				}
			);
	});
}
