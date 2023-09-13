import express from 'express';

import {
	GetResumes,
	ResumeUploadRoute,
} from '../controllers/job_applications.controller';
import { file_upload_handler } from '../utils/upload_manager.util';
export const JobApplicationsRouter = express.Router();

JobApplicationsRouter.post('/resume', file_upload_handler, ResumeUploadRoute);
JobApplicationsRouter.get('/resume', GetResumes);
