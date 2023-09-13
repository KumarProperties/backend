import { NextFunction, Request, Response } from 'express';

import { handleCommonError } from '../../utils/express.util';

import { validateAddLocationRequest } from '../../validators/apartment/location.validator';

import {
	addLocation,
	deleteLocation,
	getAllLocations,
	updateLocation,
} from '../../services/apartments/locations.service';

export async function getAllLocationsRoute(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		// console.log('Locations');
		let city_id = req.query.city_id as string;

		let result = await getAllLocations({ city_id });

		res.status(result ? 200 : 400).json(result ?? { message: 'no data found' });
	} catch (e) {
		if (!handleCommonError(e, res)) {
			next(e);
		}
	}
}

export async function deleteLocationRoute(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		let rec = await deleteLocation(req.params.location_id);
		res.status(200).json({
			message: 'city deleted successfully ',
			rec: rec,
		});
	} catch (e) {
		if (!handleCommonError(e, res)) {
			next(e);
		}
	}
}

export async function addLocationRoute(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const { value, error } = validateAddLocationRequest(req);
		if (error || !value) {
			return res.status(400).json({
				message: error?.details[0].message ?? 'Invalid Input',
			});
		}
		let rec = await addLocation(value);
		res.status(200).json({ message: 'city added successfully ', rec: rec });
	} catch (e) {
		if (!handleCommonError(e, res)) {
			next(e);
		}
	}
}

export async function updateLocationRoute(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		if (!req.body.name) {
			res.status(400).json({ message: 'Name cant be blank' });
			return;
		}
		let rec = await updateLocation(req.params.location_id, req.body.name);
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
