import Joi from 'joi';
import { Request } from 'express';
import { Location } from '../../schema/apartments/locations';

let LocationAdditionRequestValidation = Joi.object<Location>({
	name: Joi.string().required(),
	city_id: Joi.string().required(),
});

export function validateAddLocationRequest(request: Request) {
	return LocationAdditionRequestValidation.validate(request.body);
}
