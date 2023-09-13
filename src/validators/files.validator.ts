import { NextFunction, Request, Response } from 'express';

export interface UploadValidator {
	min_file_count: number;
	max_file_count: number;
	allowed_mime_type: string[] | undefined;
}

export function uploadValidator(validator: UploadValidator) {
	return (req: Request, res: Response, next: NextFunction) => {
		try {
			if (!req.files || !req.files.length) {
				res.status(400).send({ message: 'No files found' });
				return;
			}

			let count = req.files?.length as number;

			if (
				count > validator.max_file_count ||
				count < validator.min_file_count
			) {
				res.status(400).send({
					message: `Fils min = ${validator.min_file_count} max = ${validator.max_file_count}`,
				});
			}

			if (validator.allowed_mime_type) {
				const allowedMimeTypes = validator.allowed_mime_type;
				const files = Array.isArray(req.files)
					? req.files
					: Object.values(req.files);
				for (const file of files) {
					const mimeType = Array.isArray(file)
						? file[0].mimetype
						: file.mimetype;
					if (!allowedMimeTypes.includes(mimeType)) {
						res.status(400).send({ message: 'Invalid file type' });
						return;
					}
				}
			}

			next();
		} catch (e) {
			next(e);
		}
	};
}
