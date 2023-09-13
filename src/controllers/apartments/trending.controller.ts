import { NextFunction, Request, Response } from 'express';
import { validateTrendingApartmentListing } from '../../validators/apartment/trending.validator';
import {
	addApartmentToTrendingList,
	addApartmentsToTrendingList,
	getAllTrendingApartments,
	removeApartmentFromTrendingList,
} from '../../services/apartments/trending.service';

export async function postTrendingApartmentsRoute(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const { error, value } = validateTrendingApartmentListing(req.body);

		if (error || !value) {
			res.status(400).json({
				error: error?.details[0]?.message,
			});
			return;
		}
		await addApartmentsToTrendingList(value.ids);
		res.status(200).send();
	} catch (e) {
		next(e);
	}
}

export async function postTrendingApartmentRoute(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const { error, value } = validateTrendingApartmentListing(req.body);

		if (error || !value) {
			res.status(400).json({
				error: error?.details[0]?.message,
			});
			return;
		}
		await addApartmentToTrendingList(value.ids[0]);
		res.status(200).send();
	} catch (e) {
		next(e);
	}
}

export async function deleteTrendingApartmentRoute(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const { error, value } = validateTrendingApartmentListing(req.body);

		if (error || !value) {
			res.status(400).json({
				error: error?.details[0]?.message,
			});
			return;
		}

		await removeApartmentFromTrendingList(value.ids[0]);
		res.status(200).send();
	} catch (e) {
		next(e);
	}
}

export async function getTrendingApartmentRoute(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		let rec = await getAllTrendingApartments();
		return res.status(200).json({ apartments: rec });
	} catch (e) {
		next(e);
	}
}
