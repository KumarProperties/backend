import mongoose from 'mongoose';

export let MongooseError = {
	invalid_id: 'Invalid ID',
	doc_not_found: 'Record not found',
	duplicate_record: 'Duplicate record',
};

export function assertsMongoDocId(
	id:
		| string
		| number
		| mongoose.mongo.BSON.ObjectId
		| Uint8Array
		| mongoose.mongo.BSON.ObjectIdLike
		| any
) {
	if (id && !mongoose.Types.ObjectId.isValid(id)) {
		throw MongooseError.invalid_id;
	}
}
