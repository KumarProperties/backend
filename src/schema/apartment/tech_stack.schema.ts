import { Schema } from 'mongoose';

export interface TechStackEntry {
	key: string;
	value: string;
}

export interface TechStack {
	title: string;
	description: string;
	address: string;
	image_top: string;
	image_bottom: string;
	entries: TechStackEntry[];
}

const TechStackEntrySchema = new Schema<TechStackEntry & Document>({
	key: {
		type: String,
		required: false,
	},
	value: {
		type: String,
		required: false,
	},
});

export const TechStackSchema = new Schema<TechStack & Document>({
	title: {
		type: String,
		required: false,
	},
	description: {
		type: String,
		required: false,
	},
	address: {
		type: String,
		required: false,
	},
	image_top: {
		type: String,
		required: false,
	},
	image_bottom: {
		type: String,
		required: false,
	},
	entries: {
		type: [TechStackEntrySchema],
		required: false,
	},
});
