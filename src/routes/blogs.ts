import express from 'express';
import { validateToken } from '../middleware/auth_middleware';
import {
	deleteBlogsRouter,
	getBlogsByIdRoute,
	getBlogsRoute,
	postBlogsRoute,
} from '../controllers/blogs/blogs';
import { getBlogsById } from '../services/blogs/blogs';

export const BlogsRouter = express.Router();

BlogsRouter.post('/', validateToken, postBlogsRoute);
BlogsRouter.get('/', getBlogsRoute);
BlogsRouter.get('/:id', getBlogsByIdRoute);
BlogsRouter.delete('/:id', validateToken, deleteBlogsRouter);
