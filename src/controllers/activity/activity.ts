import { NextFunction, Request, Response } from 'express';
import { handleCommonError } from '../../utils/express_util';
import {
	validateActivityAdditionRequest,
	validateActivityQueryReques,
	validateDeleteActivity,
} from '../../validators/activity/activity';
import {
	deleteActivity,
	getActivities,
	getActivitiesById,
	insertActivity,
	updateActivity,
} from '../../services/activity/activity';

export async function PostActivityRouter(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const { error, value } = validateActivityAdditionRequest(req);
		console.log(value);
		console.log(error);
		if (error || !value) {
			res.status(400).json({ message: error?.details[0]?.message });
			return;
		}
		if (req.params.id) {
			await updateActivity(value, req.params.id);
		} else {
			await insertActivity(value);
		}
		res.status(200).json({ message: 'Data inserted' });
		// insertActivity(req.body)
	} catch (e) {
		if (!handleCommonError(e, res)) {
			next(e);
		}
	}
}

//
export async function GetActivitesRoutes(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const { error, value } = validateActivityQueryReques(req);
		if (error || !value) {
			res.status(400).json({ message: error?.details[0]?.message });
			return;
		}
		res.status(200).json(await getActivities(value));
	} catch (e) {
		if (!handleCommonError(e, res)) {
			next(e);
		}
	}
}

export async function GetActivitesRoutesById(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		res.status(200).json(await getActivitiesById(req.params.id));
	} catch (e) {
		if (!handleCommonError(e, res)) {
			next(e);
		}
	}
}

export async function DeleteActivitesRoutes(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const { error, value } = validateDeleteActivity(req);
		if (error || !value) {
			res.status(400).json({ message: error?.details[0]?.message });
			return;
		}
		res.status(200).json(await deleteActivity(value.id));
	} catch (e) {
		if (!handleCommonError(e, res)) {
			next(e);
		}
	}
}
