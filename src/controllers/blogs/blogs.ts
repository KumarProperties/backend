import { NextFunction, Request, Response } from 'express';
import { handleCommonError } from '../../utils/express_util';
import {
	getBlogsById,
	insertBlog,
	deletBlogs,
	getBlogs,
} from '../../services/blogs/blogs';
import {
	validateBlogFetchRequest,
	validateBlogsAdditionRequest,
} from '../../validators/blogs/blogs';

export async function postBlogsRoute(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const { error, value } = validateBlogsAdditionRequest(req);
		if (error || !value) {
			res.status(400).json({
				error: error?.details[0]?.message,
			});
			return;
		}
		let result = await insertBlog(value);
		res.status(200).send({ result: result });
	} catch (e) {
		if (!handleCommonError(e, res)) {
			next(e);
		}
	}
}

//TODO: remove id query param suppoert and force to path params
export async function getBlogsRoute(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		let id = req.query.id as string | undefined;
		if (id) {
			res.status(200).send(await getBlogsById({ id }));
		} else {
			const { error, value } = validateBlogFetchRequest(req);
			console.log(value);
			if (error || !value) {
				res.status(400).json({
					error: error?.details[0]?.message,
				});
				return;
			}
			res.status(200).send(await getBlogs(value));
		}
	} catch (e) {
		if (!handleCommonError(e, res)) {
			next(e);
		}
	}
}

export async function getBlogsByIdRoute(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		let id = req.params.id as string | undefined;
		if (id) {
			res.status(200).send(await getBlogsById({ id }));
		} else {
			res.status(400).send({ message: 'id is reuired' });
		}
	} catch (e) {
		if (!handleCommonError(e, res)) {
			next(e);
		}
	}
}

export async function deleteBlogsRouter(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		let id = req.params.id as string | undefined;
		res.status(200).send(await deletBlogs({ id }));
	} catch (e) {
		if (!handleCommonError(e, res)) {
			next(e);
		}
	}
}
