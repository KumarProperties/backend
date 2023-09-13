import mongoose, { Schema } from 'mongoose';
import { City } from './cities.schema';

export interface Location {
	name: string;
	city_id: mongoose.Types.ObjectId | City | string;
	commercial_property_count: number;
	residential_property_count: number;
}

export let LocationSchema = new mongoose.Schema<Location & Document>({
	name: {
		type: String,
		required: true,
	},

	city_id: {
		type: Schema.Types.ObjectId,
		ref: 'Cities',
		required: true,
	},

	commercial_property_count: {
		type: Number,
		required: false,
		default: 0,
	},

	residential_property_count: {
		type: Number,
		required: false,
		default: 0,
	},
});

export const LocationModel = mongoose.model('locations', LocationSchema);
