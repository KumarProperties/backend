import express from 'express';

import { AuthRouter } from './auth';
import { FileUploadRouter } from './file_upload';
import { ApartmentRouter, ApartmentTrendingRouter } from './apartment';
import { ActivityRouter } from './activity';
import { BlogsRouter } from './blogs';
import { sendMail } from '../mail/mail';
import { RemoveUntrackedFilesRoute } from './files';
import { JobApplicationsRouter } from './JobApplications';

export const indexRouter = express.Router();
indexRouter.get('/', (req, res, next) => {
	console.log('Get API Called');
	res.status(201).json({ message: 'Apis are live :)' });
});
indexRouter.use('/app/auth', AuthRouter);
indexRouter.use('/app/apartment', ApartmentRouter);
indexRouter.use('/app/trending/apartment', ApartmentTrendingRouter);
indexRouter.use('/app/files', FileUploadRouter);
indexRouter.use('/app/activity', ActivityRouter);
indexRouter.use('/app/blogs', BlogsRouter);
indexRouter.delete('/app/remove_untracked_files', RemoveUntrackedFilesRoute);
indexRouter.use('/app/careers', JobApplicationsRouter);
indexRouter.post('/sendmail', async (req, res, next) => {
	try {
		// await sendMail('hellooooooooooo')
		res.status(200).json({ email: 'sent' });
	} catch (e) {
		res.status(400).send();
	}
});
