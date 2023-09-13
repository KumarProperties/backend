import Joi from 'joi';
import { Request } from 'express';

import {
	Activity,
	ActivityQuery,
	ActivityType,
	Date,
} from '../models/activity.model';

let DateValidation = Joi.object<Date>({
	start_date: Joi.string().optional().allow(''),
	end_date: Joi.string().allow(''),
	dates: Joi.array().items(Joi.string().allow('')),
}).optional();

let ActivityAdditionValidation = Joi.object<Activity>({
	title: Joi.string().optional().allow(''),
	sub_title: Joi.string().optional().allow(''),
	date: DateValidation.optional(),
	files: Joi.array().items(Joi.string().allow('')),
	thumb: Joi.string().optional().allow(''),
	location: Joi.string().optional().allow(''),
	type: Joi.string()
		.valid(
			ActivityType.CSR_ACTIVITY,
			ActivityType.EVENT,
			ActivityType.EXHIBITIONS,
			ActivityType.TESTIMONIAL
		)
		.required(),
	desc: Joi.string().allow(''),
	address: Joi.string().allow(''),
	redirection_link: Joi.string().allow(''),
	share_link: Joi.string().allow(''),
	related_to_project: Joi.string().allow(''),
});

export function validateActivityAdditionRequest(request: Request) {
	return ActivityAdditionValidation.validate(request.body);
}

let ValidateQueryRequest = Joi.object<ActivityQuery>({
	type: Joi.string()
		.valid(
			ActivityType.CSR_ACTIVITY,
			ActivityType.EVENT,
			ActivityType.EXHIBITIONS,
			ActivityType.TESTIMONIAL
		)
		.required(),
	page_no: Joi.number().default(0),
	limit: Joi.number().default(50),
});

export function validateActivityQueryRequest(request: Request) {
	return ValidateQueryRequest.validate(request.query);
}

export function validateDeleteActivity(request: Request) {
	return Joi.object<{ id: string }>({
		id: Joi.string().required(),
	}).validate(request.params);
}
