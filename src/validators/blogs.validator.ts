import { Request } from 'express';
import Joi from 'joi';
import { Blog, BlogFetchRequest, BlogsContent } from '../models/blogs.model';

let BlogsContentValidation = Joi.object<BlogsContent>({
	image: Joi.string().allow('').optional(),
	text: Joi.string().allow('').optional(),
}).optional();

let ValidateQueryRequest = Joi.object<Blog>({
	title: Joi.string().optional().allow(''),
	sub_title: Joi.string().optional().allow(''),
	desc: Joi.string().optional().allow(''),
	thumb: Joi.string().optional().allow(''),
	date: Joi.string().optional().allow(''),
	content: Joi.array().items(BlogsContentValidation).optional(),
	_id: Joi.string().optional(),
});

export function validateBlogsAdditionRequest(request: Request) {
	return ValidateQueryRequest.validate(request.body);
}

let FetchBlogRequest = Joi.object<BlogFetchRequest>({
	page_no: Joi.number().default(0),
	limit: Joi.number().default(50),
});

export function validateBlogFetchRequest(request: Request) {
	return FetchBlogRequest.validate(request.query);
}
