import Joi from 'joi';
import { Request } from 'express';
import { City } from '../../schema/apartment/cities.schema';

let CityAdditionRequestValidation = Joi.object<City>({
	name: Joi.string().required(),
});

export function validateAddCityRequest(request: Request) {
	return CityAdditionRequestValidation.validate(request.body);
}
