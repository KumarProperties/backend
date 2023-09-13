import mongoose from 'mongoose';
import { assertsMongoDocId } from '../validators/mongoose_validator';

export interface TimeStamp {
	updatedAt: Date;
	createdAt: Date;
	__v: number;
}
