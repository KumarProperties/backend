import multer from 'multer';
import { Storages } from './storage_manager.util';

export const file_upload_handler = multer({
	storage: Storages.filesStorage,
}).array('files');
