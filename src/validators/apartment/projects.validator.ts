import { Request } from 'express';
import Joi from 'joi';
import {
	ApartmentAdditionRequest,
	ApartmentDeletionRequest,
	AptAreasRequestBody,
	AptTypeRequestBody,
	PropertyType,
	AptSizeListingBody,
	ProjectRequestBody,
	ApartmentStatus,
} from '../../models/apartments/projects.model';
import { FlatView } from '../../schema/apartment/flat_view.schema';
import {
	TechStack,
	TechStackEntry,
} from '../../schema/apartment/tech_stack.schema';
import {
	Amenities,
	Bulleting,
	FlatDetails,
	IsometricView,
	Specification,
} from '../../schema/apartment/flat_details.schema';
import { ApartmentDocument } from '../../schema/apartment/document.schema';
import { Certifications } from '../../models/apartments/certifications.model';
import {
	MapSet,
	LocationType,
	MapEntry,
} from '../../schema/apartment/map.schema';
import { MetaTag } from '../../schema/apartment.schema';

//------------------------------------------ Filter -------------------------------------------------------------

const aptTypeListingValidation = Joi.object<AptTypeRequestBody>({
	location_id: Joi.string().required(),
	property_type: Joi.string()
		.valid(PropertyType.ALL, PropertyType.COMMERCIAL, PropertyType.RESIDENTIAL)
		.required(),
});

export function validateAptTypeListingRequest(request: Request) {
	return aptTypeListingValidation.validate(request.query);
}

//------------------------------------------------------------------------------------
const aptAreaListingValidation = Joi.object<AptAreasRequestBody>({
	city: Joi.string().optional(),
});

export function validateAptAreasListingRequest(request: Request) {
	return aptAreaListingValidation.validate(request.body);
}

//------------------------------------------------------------------------------------

const aptSizesListingValidation = Joi.object<AptSizeListingBody>({
	location_id: Joi.string().required(),
	apt_type: Joi.string().required(),
});

export function validateAptSizeListingRequest(request: Request) {
	return aptSizesListingValidation.validate(request.query);
}

//-------------------------------------------------- CURD --------------------------------------------------

const BulletingValidation = Joi.object<Bulleting>({
	title: Joi.string().optional().allow(''),
	points: Joi.array().items(Joi.string()).optional(),
});

const AmenitiesValidationSchema = Joi.object<Amenities>({
	bulleting: Joi.array().items(BulletingValidation.optional()).optional(),
	images: Joi.array().items(Joi.string().optional().allow('')).optional(),
});

const SpecificationsValidationSchema = Joi.object<Specification>({
	top_image: Joi.string().optional().allow(''),
	bottom_image: Joi.string().optional().allow(''),
	bulleting: Joi.array().items(BulletingValidation.optional()).optional(),
});

const IsometricViewValidationSchema = Joi.object<IsometricView>({
	media: Joi.array().items(Joi.string().allow('')).optional(),
});

const FlatDetailsValidationSchema = Joi.object<FlatDetails>({
	amenities: AmenitiesValidationSchema.optional(),
	specification: SpecificationsValidationSchema.optional(),
	isometric_view: IsometricViewValidationSchema.optional(),
});
const CertificationValidationSchema = Joi.object<Certifications>({
	certified_by: Joi.array().items(Joi.string().allow('')).optional(),
	description: Joi.string().allow('').optional(),
	description_logo: Joi.string().allow('').optional(),
	qr_images: Joi.array().items(Joi.string().allow('').optional()).optional(),
});

const FlatViewValidation = Joi.object<FlatView>({
	walk_through: Joi.string().optional().allow(''),
	flat_view_360: Joi.string().optional().allow(''),
	live_view: Joi.string().optional().allow(''),
});
const TechStackEntryValidationSchema = Joi.object<TechStackEntry>({
	key: Joi.string().optional().allow(''),
	value: Joi.string().optional().allow(''),
});
const MapEntry2 = Joi.object<MapEntry>({
	distance: Joi.string().optional().allow(''),
	location_name: Joi.string().optional().allow(''),
});
const MapSetValidationSchema = Joi.object<MapSet>({
	title: Joi.string().optional().allow(''),
	type: Joi.string()
		.optional()
		.valid(...Object.values(LocationType))
		.optional(),
	locations: Joi.array().items(MapEntry2.optional()).required(),
});

const TechStackValidation = Joi.object<TechStack>({
	title: Joi.string().optional().allow(''),
	description: Joi.string().optional().allow(''),
	address: Joi.string().optional().allow(''),
	image_top: Joi.string().optional().allow(''),
	image_bottom: Joi.string().optional().allow(''),
	entries: Joi.array()
		.items(TechStackEntryValidationSchema.optional())
		.optional(),
});

const ApartmentDocumentValidationSchema = Joi.object<ApartmentDocument>({
	title: Joi.string().optional(),
	location: Joi.string().optional(),
});

const MetaTagValidationSchema = Joi.object<MetaTag>({
	key: Joi.string().optional(),
	tag: Joi.string().optional(),
});

const apartmentAdditionValidation = Joi.object<ApartmentAdditionRequest>({
	title: Joi.string().optional().allow(''),
	sub_title: Joi.string().optional().allow(''),
	tags: Joi.array().items(Joi.string().optional().allow('')).optional(),
	title_image: Joi.array()
		.items(Joi.string().optional().allow(''))
		.optional()
		.allow(''),
	contact_number: Joi.string().optional().allow(''),
	description: Joi.string().optional().allow(''),
	apt_type: Joi.array().items(Joi.string().optional()).optional(),
	size: Joi.string().optional().allow(''),
	status: Joi.string()
		.valid(
			...Object.values(ApartmentStatus).filter(
				(it) => it != ApartmentStatus.ALL
			)
		)
		.required(),
	gallery_medias: Joi.array().items(Joi.string().allow('')).optional(),
	flat_view: FlatViewValidation.optional(),
	tech_stack: TechStackValidation.optional(),
	flat_details: FlatDetailsValidationSchema.optional(),
	layout: Joi.string().optional().allow(''),
	apartment_document: Joi.array()
		.items(ApartmentDocumentValidationSchema)
		.optional(),
	location_id: Joi.string().required(),
	propertyType: Joi.string()
		.valid(...Object.values(PropertyType))
		.required(),
	_id: Joi.string().optional().allow(''),
	logo: Joi.string().optional().allow(''),
	certification: CertificationValidationSchema.optional(),
	maps: Joi.array().items(MapSetValidationSchema.optional()).optional(),
	location_in_map: Joi.string().optional().allow(''),
	slug: Joi.string().required(),
	meta_tags: Joi.array().items(MetaTagValidationSchema.optional()).optional(),
});

export function validateApartmentForAddition(request: Request) {
	return apartmentAdditionValidation.validate(request.body);
}

//------------------------------------------------------------------------------------

const apartmentDeletionValidation = Joi.object<ApartmentDeletionRequest>({
	aptId: Joi.string().required(),
});

export function validateApartmentForDelete(request: Request) {
	return apartmentDeletionValidation.validate(request.body);
}

//------------------------------------------------------------------------------------

export function validateApartmentForUpdate(request: Request) {
	return apartmentAdditionValidation.validate(request.body);
}

//------------------------------------------------------------------------------------
const apartmentProjectListingValidation = Joi.object<ProjectRequestBody>({
	city_id: Joi.string().allow('').optional(),
	location_id: Joi.string().allow('').optional(),
	apt_type: Joi.string().allow('').optional(),
	size: Joi.string().allow('').optional(),
	status: Joi.string()
		.valid(...Object.values(ApartmentStatus))
		.optional(),
	property_type: Joi.string()
		.valid(PropertyType.COMMERCIAL, PropertyType.RESIDENTIAL, PropertyType.ALL)
		.optional(),
	location_name: Joi.string().allow('').optional(),
	city_name: Joi.string().allow('').optional(),
	id: Joi.string().allow('').optional(),
	slug: Joi.string().allow('').optional(),
});

export function validateApartmentForProjectListing(request: Request) {
	return apartmentProjectListingValidation.validate(request.query);
}
