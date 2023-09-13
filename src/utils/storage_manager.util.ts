import { randomUUID } from 'crypto';
import multerS3 from 'multer-s3';

import { awsRootFolder, myS3Client } from './aws.util';

export let Storages = {
	filesStorage: multerS3({
		s3: myS3Client,
		bucket: process.env.BUCKET as any,
		contentType: multerS3.AUTO_CONTENT_TYPE,
		key: function (req, file, cb) {
			// console.log(file);
			const fileExtension = file.originalname.split('.').pop();
			const fileName = `${randomUUID()}.${fileExtension}`;
			cb(null, `${awsRootFolder}uploads/files/${fileName}`);
		},
	}),
};
