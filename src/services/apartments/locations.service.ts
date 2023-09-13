import {
	Location,
	LocationModel,
} from '../../schema/apartment/locations.schema';

import {
	MongooseError,
	assertsMongoDocId,
} from '../../validators/mongoose.validator';

import { CityModel } from '../../schema/apartment/cities.schema';
import { ApartmentModel } from '../../schema/apartment.schema';

interface AggregationResult {
	locations: {
		name: string;
		location_id: string;
		commercial_property_count: number;
		residential_property_count: number;
	}[];
}

export async function getAllLocations({
	city_id = undefined,
}: {
	city_id: string | undefined;
}): Promise<AggregationResult | undefined> {
	let filter: any = {};

	if (city_id) {
		assertsMongoDocId(city_id);
		filter.city_id = city_id;
	}

	let locations = await LocationModel.find(filter);

	return {
		locations: locations.map((it) => {
			return {
				name: it.name,
				location_id: it._id.toString(),
				commercial_property_count: it.commercial_property_count,
				residential_property_count: it.residential_property_count,
			};
		}),
	};
}

export async function deleteLocation(id: string) {
	return LocationModel.findByIdAndDelete(id);
}

export async function addLocation(location: Location) {
	if (await CityModel.findById(location.city_id)) {
		const locationIfExists = await LocationModel.findOne({
			name: location.name,
			city_id: location.city_id,
		});

		if (locationIfExists) {
			throw MongooseError.duplicate_record;
		}

		let newRecord = new LocationModel(location);

		return await newRecord.save();
	} else throw new Error('city not found');
}

export async function updateLocation(location_id: string, new_name: string) {
	if (await LocationModel.findById(location_id)) {
		await LocationModel.findByIdAndUpdate(location_id, {
			name: new_name,
		});
		await ApartmentModel.updateMany(
			{
				location_id: location_id,
			},
			{
				location_name: new_name,
			}
		);
		return;
	}
	throw new Error('Location Not found');
}
