import { Schema } from 'mongoose';

//------------------------------------Bulleting-------------------------------
export interface Bulleting {
	title: string;
	points: string[];
}

export let BulletingSchema = new Schema<Bulleting & Document>({
	title: String,
	points: [String],
});

//------------------------------------Amenities-------------------------------
export interface Amenities {
	images: string[];
	bulleting: Bulleting[];
}

export let AmenitiesSchema = new Schema<Amenities & Document>({
	images: { type: [String], required: false },
	bulleting: {
		type: [BulletingSchema],
		required: false,
	},
});

//------------------------------------Specification-------------------------------
export interface Specification {
	top_image: string;
	bottom_image: string;
	bulleting: Bulleting[];
}

export let SpecificationSchema = new Schema<Specification & Document>({
	top_image: { type: String, required: false },
	bottom_image: { type: String, required: false },
	bulleting: {
		type: [BulletingSchema],
		required: false,
	},
});
//------------------------------------Iso metric view-------------------------------
export interface IsometricView {
	media: string[];
}

export let IsometricViewSchema = new Schema<IsometricView & Document>({
	media: { type: [String], required: false },
});

//------------------------------------Flat Details-------------------------------
export interface FlatDetails {
	amenities: Amenities;
	specification: Specification;
	isometric_view: IsometricView;
}

export const FlatDetailsSchema = new Schema<FlatDetails & Document>({
	amenities: {
		type: AmenitiesSchema,
		required: false,
	},
	specification: {
		type: SpecificationSchema,
		required: false,
	},
	isometric_view: {
		type: IsometricViewSchema,
		required: false,
	},
});
