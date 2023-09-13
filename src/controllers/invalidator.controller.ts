import { NextFunction, Request, Response } from 'express';
import { invalidateAllUntrackedFilesFromDB } from '../services/invalidator.service';

export async function InvalidatorRoute(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		let x = await invalidateAllUntrackedFilesFromDB(true);
		res.status(200).send(x);
	} catch (e) {
		res.status(400).send(e);
		console.error(e);
	}
}

export async function GetFilesCont(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		let x = await invalidateAllUntrackedFilesFromDB(false);
		res.status(200).send(x);
	} catch (e) {
		res.status(400).send(e);
		console.error(e);
	}
}
