import Joi from 'joi';

const newLocal = Joi.object<{ ids: string[] }>({
	ids: Joi.array().items(Joi.string().optional()).optional(),
});

export function validateTrendingApartmentListing(body:any) {
	return newLocal.validate(body);
}
