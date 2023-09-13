import express from 'express';

import { AuthRouter } from './auth.route';
import { FileUploadRouter } from './file_upload.route';
import { ApartmentRouter, ApartmentTrendingRouter } from './apartment.route';
import { ActivityRouter } from './activity.route';
import { BlogsRouter } from './blogs.route';
import { RemoveUntrackedFilesRoute } from './files.route';
import { JobApplicationsRouter } from './job_application.route';

export const indexRouter = express.Router();
indexRouter.get('/', (req, res, next) => {
	res.status(201).json({ message: 'Apis are live :)' });
});
indexRouter.delete('/app/remove_untracked_files', RemoveUntrackedFilesRoute);

indexRouter.use('/app/auth', AuthRouter);
indexRouter.use('/app/apartment', ApartmentRouter);
indexRouter.use('/app/trending/apartment', ApartmentTrendingRouter);
indexRouter.use('/app/files', FileUploadRouter);
indexRouter.use('/app/activity', ActivityRouter);
indexRouter.use('/app/blogs', BlogsRouter);
indexRouter.use('/app/careers', JobApplicationsRouter);
