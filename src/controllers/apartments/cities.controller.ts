import { NextFunction, Request, Response } from 'express';
import {
	addCity,
	getAllCities,
	updateCity,
} from '../../services/apartments/cities.service';
import { handleCommonError } from '../../utils/express.util';
import { validateAddCityRequest } from '../../validators/apartment/cities.validator';

export async function getAllCitiesRoute(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		let result = await getAllCities();

		res.status(result ? 200 : 400).json(result ?? { message: 'no data found' });
	} catch (e) {
		if (!handleCommonError(e, res)) {
			next(e);
		}
	}
}

export async function addCitiesRoute(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const { value, error } = validateAddCityRequest(req);
		if (error || !value) {
			return res.status(400).json({
				message: error?.details[0].message ?? 'Invalid Input',
			});
		}
		let rec = await addCity(value);
		res.status(200).json({ message: 'city added successfully ', rec: rec });
	} catch (e) {
		if (!handleCommonError(e, res)) {
			next(e);
		}
	}
}

export async function updateCityRoute(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		if (!req.body.name) {
			res.status(400).json({ message: 'Name cant be blank' });
			return;
		}
		let rec = await updateCity(req.params.city_id, req.body.name);
		res.status(200).json({
			message: 'city updated successfully ',
			rec: rec,
		});
	} catch (e) {
		if (!handleCommonError(e, res)) {
			next(e);
		}
	}
}
