import { PropertyType } from '../../models/apartments/apartment_projects';
import { ApartmentModel } from '../../schema/apartments/apartments';
import { assertsMongoDocId } from '../../validators/mongoose_validator';

interface AggregationResult {
	apt_type: string[];
}

export async function getAllAptTypes({
	location_id,
	property_type,
}: {
	location_id: string | undefined;
	property_type: PropertyType;
}): Promise<AggregationResult> {
	let filter: any = {};

	if (location_id) {
		assertsMongoDocId(location_id);
		filter.location_id = location_id;
	}

	if (property_type !== PropertyType.ALL) {
		filter.propertyType = property_type.toString();
	}
	let apt_typs: string[] = [];
	const result = await ApartmentModel.find(filter);
	result.forEach((it) => (apt_typs = apt_typs.concat(it.apt_type)));
	console.log('-----------------------------------------------------------');
	console.log('GetAptType', apt_typs, result);
	return { apt_type: Array.from(new Set(apt_typs)) };
}
