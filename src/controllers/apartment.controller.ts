import { NextFunction, Request, Response } from 'express';

import {
	validateApartmentForAddition,
	validateApartmentForProjectListing,
	validateApartmentForUpdate,
} from '../validators/apartment/projects.validator';

import insertApartmentOrUpdate, {
	getApartments,
	getApartmentsByName,
	refreshCount,
	removeApartment,
	updateApartment,
} from '../services/apartment.service';

import { handleCommonError } from '../utils/express.util';

//-----------------------------------------GET--------------------------------------

export async function getProjectsRoute(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const { error, value } = validateApartmentForProjectListing(req);

		if (error || !value) {
			res.status(400).json({
				error: error?.details[0]?.message,
			});
			return;
		}

		// console.log('APT ID => ', value.id);
		let data = await getApartments(value);
		res.status(200).json(data);
	} catch (e) {
		if (!handleCommonError(e, res)) {
			next(e);
		}
	}
}

export async function searchProject(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		let query: string;
		if (typeof req.query.q === 'string') {
			query = req.query.q;
			getApartmentsByName(query);
		}
		throw new Error('query parameter q is required');
	} catch (e) {
		if (!handleCommonError(e, res)) {
			throw e;
		}
	}
}

//-----------------------------------------POST--------------------------------------

export async function postApartmentRoute(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const { error, value } = validateApartmentForAddition(req);

		if (error || !value) {
			res.status(400).json({
				error: error?.details[0]?.message,
			});
			return;
		}

		// console.log(error, value);

		let data = await insertApartmentOrUpdate(value);

		res.status(200).json({
			message: 'apartment added successfully',
			data: data,
		});
	} catch (e) {
		if (!handleCommonError(e, res)) {
			next(e);
		}
	}
}

//-----------------------------------------DELETE-----------------------------------

export async function deleteProjectRoute(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		let apartment_id = req.params.apartment_id;
		await removeApartment(apartment_id);
		res.status(200).json({
			message: 'Item removed',
		});
	} catch (e) {
		if (!handleCommonError(e, res)) {
			next(e);
		}
	}
}

//-----------------------------------------Update-----------------------------------

export async function updateProjectRoute(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		let apt_id = req.params.apt_id as string | undefined;
		const { error, value } = validateApartmentForUpdate(req);

		if (error || !value || !apt_id) {
			res.status(400).json({
				error: error?.details[0]?.message,
			});
			return;
		}

		await updateApartment(apt_id, value);

		res.status(200).json({
			message: 'Item Updated',
		});
	} catch (e) {
		if (!handleCommonError(e, res)) {
			next(e);
		}
	}
}

//---------------------------Refresh Count----------------------
export async function aptCountsRefreshRoute(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		await refreshCount();
		res.status(200).json({ message: 'count updated' });
	} catch (e) {
		console.error(e);
		next(e);
	}
}
