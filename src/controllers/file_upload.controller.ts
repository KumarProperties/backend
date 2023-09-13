import { NextFunction, Request, Response } from 'express';
import { deleteFileFromS3, toPublicUrl } from '../utils/aws.util';

export async function uploadFilesRoute(
	req: Request,
	res: Response,
	next: NextFunction
) {
	res.status(200).send({
		url: (req.files as any[])?.map((it) => {
			return toPublicUrl(it.location);
		}),
	});
}

export async function deleteUploadedFile(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		if (typeof req.query.url === 'string') {
			await deleteFileFromS3([req.query.url]);
		} else {
			await deleteFileFromS3(req.query.url as string[]);
		}
		res.status(200).send({ urls: req.query.url });
	} catch (e) {
		res.status(400).send({ urls: req.query.url });
		console.error(e);
	}
}
