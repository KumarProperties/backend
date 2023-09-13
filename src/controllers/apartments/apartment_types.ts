import { NextFunction, Request, Response } from 'express';
import { getAllAptTypes } from '../../services/apartments/apartment_types';
import { validateAptTypeListingRequest as validateAptTypeListingRequest } from '../../validators/apartments/apartment_projects';

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

		res.status(result ? 200 : 400).json(
			result ?? { message: 'no data found' }
		);
	} catch (e) {
		console.log(e);
		next(e);
	}
}
