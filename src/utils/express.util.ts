import { Response } from 'express';
import { MongooseError } from '../validators/mongoose.validator';

export function handleCommonError(error: unknown, res: Response): boolean {
	if (error === MongooseError.invalid_id) {
		res.status(400).send({ message: 'Invalid Document ID' });
		return true;
	}

	if (error === MongooseError.doc_not_found) {
		res.status(400).send({ message: 'Record Not found' });
		return true;
	}

	if (error === MongooseError.duplicate_record) {
		res.status(400).send({ message: 'Duplicate record' });
		return true;
	}
	return false;
}
