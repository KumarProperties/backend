import { NextFunction, Request, Response } from 'express';
import { validateAptSizeListingRequest } from '../../validators/apartment/projects.validator';
import { getApartmentSizes } from '../../services/apartments/sizes.service';
import { handleCommonError } from '../../utils/express.util';

export default async function getAllAptSizesRoute(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const { error, value } = validateAptSizeListingRequest(req);

		if (error || !value) {
			res.status(400).json({
				error: error?.details[0]?.message,
			});
			return;
		}

		let result = await getApartmentSizes(value);

		res.status(result ? 200 : 400).json(result ?? { message: 'no data found' });
	} catch (e) {
		if (!handleCommonError(e, res)) {
			next(e);
		}
	}
}
