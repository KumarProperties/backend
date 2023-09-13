import mongoose, { Schema } from 'mongoose';
import { TimeStamp } from '../utils/mongoose.util';

import { PropertyType } from '../models/apartments/projects.model';
import { Certifications } from '../models/apartments/certifications.model';

import { FlatView, FlatViewSchema } from './apartment/flat_view.schema';
import { TechStack, TechStackSchema } from './apartment/tech_stack.schema';
import {
	FlatDetails,
	FlatDetailsSchema,
} from './apartment/flat_details.schema';
import {
	ApartmentDocument,
	ApartmentDocumentSchema,
} from './apartment/document.schema';
import { Location } from './apartment/locations.schema';
import { CertificationsSchema } from './apartment/certifications.schema';
import { MapSet, MapSetSchema } from './apartment/map.schema';

export interface MetaTag {
	key: string;
	tag: string;
}

export interface Apartment {
	title: string;
	sub_title: string;
	tags: string[];
	title_image: string[];
	contact_number: string;
	description: string;
	apt_type: string[];
	size: string;
	status: string;
	gallery_medias: string[];

	flat_view: FlatView;
	tech_stack: TechStack;
	flat_details: FlatDetails;
	layout: string;
	apartment_document: ApartmentDocument[];
	location_id: mongoose.Types.ObjectId | Location | string;
	propertyType: PropertyType;

	location_name: string;
	city_name: string;
	city_id: string;
	_id: string | undefined;
	logo: string | undefined;
	certification: Certifications;
	maps: MapSet[];
	location_in_map: string;
	slug?: string;
	meta_tags: MetaTag[];
}

export const MetaTagSchema = new Schema<MetaTag>({
	key: { type: String },
	tag: { type: String },
});

export const ApartmentSchema = new Schema<Apartment & Document & TimeStamp>({
	title: { type: String, required: false },
	sub_title: { type: String, required: false },
	tags: { type: [String], required: false },
	title_image: { type: [String], required: false },
	contact_number: { type: String, required: false },
	description: { type: String, required: false },
	flat_view: { type: FlatViewSchema, required: false },
	tech_stack: { type: TechStackSchema, required: false },
	flat_details: { type: FlatDetailsSchema, required: false },
	gallery_medias: { type: [String], required: false },
	layout: { type: String, required: false },
	apartment_document: { type: [ApartmentDocumentSchema], required: false },
	location_id: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'Locations',
	},
	apt_type: { type: [String], required: false },
	size: { type: String, required: false },
	status: { type: String, required: true },
	propertyType: {
		type: String,
		enum: {
			values: Object.values(PropertyType),
			message: `propertyType must be on of ${Object.values(PropertyType)}`,
		},
	},

	location_name: {
		type: String,
		required: true,
	},
	city_name: {
		type: String,
		required: true,
	},
	city_id: {
		type: String,
		required: true,
	},
	logo: {
		type: String,
		required: false,
	},
	certification: {
		type: CertificationsSchema,
		required: false,
	},
	maps: {
		type: [MapSetSchema],
		required: false,
	},
	location_in_map: {
		type: String,
	},

	slug: {
		type: String,
		required: false,
		unique: true,
		index: {
			unique: true,
		},
	},

	meta_tags: {
		type: [MetaTagSchema],
	},
});

export let ApartmentModel = mongoose.model<Apartment & Document & TimeStamp>(
	'apartments',
	ApartmentSchema
);
