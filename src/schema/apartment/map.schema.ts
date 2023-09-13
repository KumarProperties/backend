import { Schema } from 'mongoose';

export enum LocationType {
	School = 'School',
	Hospital = 'Hospital',
	IT = 'IT',
	Malls = 'Malls',
	Others = 'Others',
	Park = 'Park',
}

export interface MapEntry {
	distance: string;
	location_name: string;
}

export interface MapSet {
	type: LocationType;
	title: string;
	locations: MapEntry[];
}

let MapEntrySchema = new Schema<MapEntry & Document>({
	distance: {
		type: String,
	},
	location_name: {
		type: String,
	},
});

export let MapSetSchema = new Schema<MapSet & Document>({
	title: {
		type: String,
	},
	locations: {
		type: [MapEntrySchema],
	},
	type: {
		type: String,
		enum: Object.values(LocationType),
		required: true,
	},
});
