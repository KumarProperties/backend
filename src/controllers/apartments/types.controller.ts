import { NextFunction, Request, Response } from 'express';
import { getAllAptTypes } from '../../services/apartments/types.service';
import { validateAptTypeListingRequest } from '../../validators/apartment/projects.validator';

export default async function getAllAptTypesRoute(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const { error, value } = validateAptTypeListingRequest(req);

		if (error || !value) {
			res.status(400).json({
				error: error?.details[0]?.message,
			});
			return;
		}

		let result = await getAllAptTypes(value);

		res.status(result ? 200 : 400).json(result ?? { message: 'no data found' });
	} catch (e) {
		console.error(e);
		next(e);
	}
}
