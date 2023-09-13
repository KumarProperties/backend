import mongoose from 'mongoose';
import { PropertyType } from '../../models/apartments/apartment_projects';

export interface City {
	name: string;
	commercial_property_count: number;
	residential_property_count: number;
}

export let CitySchema = new mongoose.Schema<City & Document>({
	name: {
		type: String,
		required: true,
		unique: true,
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

export const CityModel = mongoose.model<City>('City', CitySchema);
