import express from 'express';
import { deleteUploadedFile, uploadFilesRoute } from '../controllers/file_upload/file_upload';
import { file_upload_handler } from '../utils/upload_manager';
import { GetFilesCont, InlvaidatorRoute } from '../controllers/invalidator/invalidator';

export const FileUploadRouter = express.Router();

FileUploadRouter.post('/upload', file_upload_handler, uploadFilesRoute);
FileUploadRouter.delete('/upload', deleteUploadedFile)
FileUploadRouter.delete('/invalidate', InlvaidatorRoute)
FileUploadRouter.get('/invalidate', GetFilesCont)
