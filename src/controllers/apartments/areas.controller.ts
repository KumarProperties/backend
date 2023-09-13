import { NextFunction, Request, Response } from 'express';
import { getAllAreas } from '../../services/apartments/areas.service';
import { validateAptAreasListingRequest } from '../../validators/apartment/projects.validator';
import { handleCommonError } from '../../utils/express.util';

export default async function getAllAreasRoute(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const { error, value } = validateAptAreasListingRequest(req);

		if (error || !value) {
			res.status(400).json({
				error: error?.details[0]?.message,
			});
			return;
		}

		let result = await getAllAreas(value);

		res.status(result ? 200 : 400).json(result ?? { message: 'no data found' });
	} catch (e) {
		if (!handleCommonError(e, res)) {
			next(e);
		}
	}
}
