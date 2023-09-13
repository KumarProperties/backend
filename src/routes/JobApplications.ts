import express from 'express';
import {
	GetResumes,
	ResumeUploadRoute,
} from '../controllers/job_applications/JobApplications';
import { file_upload_handler } from '../utils/upload_manager';
export const JobApplicationsRouter = express.Router();

JobApplicationsRouter.post('/resume', file_upload_handler, ResumeUploadRoute);
JobApplicationsRouter.get('/resume', GetResumes);
