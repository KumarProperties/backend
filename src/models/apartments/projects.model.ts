import { Apartment } from '../../schema/apartment.schema';

export enum PropertyType {
	COMMERCIAL = 'COMMERCIAL',
	RESIDENTIAL = 'RESIDENTIAL',
	ALL = 'ALL',
}

export enum ApartmentStatus {
	ON_GOING = 'Ongoing',
	SOLD = 'Sold',
	NEW = 'New',
	ALL = 'all',
}

export interface ProjectRequestBody {
	city_id: string | undefined;
	location_id: string | undefined;
	apt_type: string | undefined;
	size: string | undefined;
	status: ApartmentStatus | undefined;
	property_type: PropertyType.ALL;
	location_name: string | undefined;
	city_name: string | undefined;
	id: string | undefined;
	slug: string | undefined;
}

export interface AptTypeRequestBody {
	location_id: string | undefined;
	property_type: PropertyType;
}

export interface AptAreasRequestBody {
	city: string | undefined;
}

export interface AptSizeListingBody {
	location_id: string;
	apt_type: string | undefined;
}

export interface ApartmentAdditionRequest extends Apartment {}

export interface ApartmentDeletionRequest {
	city: string;
	location: string;
	aptId: string;
}

export interface ApartmentUpdateRequest extends Apartment {
	apt_id: string;
}
