import express from 'express';
import {
	deleteUploadedFile,
	uploadFilesRoute,
} from '../controllers/file_upload.controller';
import { file_upload_handler } from '../utils/upload_manager.util';
import {
	GetFilesCont,
	InvalidatorRoute,
} from '../controllers/invalidator.controller';

export const FileUploadRouter = express.Router();

FileUploadRouter.post('/upload', file_upload_handler, uploadFilesRoute);
FileUploadRouter.delete('/upload', deleteUploadedFile);
FileUploadRouter.delete('/invalidate', InvalidatorRoute);
FileUploadRouter.get('/invalidate', GetFilesCont);
