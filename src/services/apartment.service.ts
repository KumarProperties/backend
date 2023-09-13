import { Apartment, ApartmentModel } from '../schema/apartment.schema';

import { assertsMongoDocId } from '../validators/mongoose.validator';

import {
	ApartmentStatus,
	PropertyType,
} from '../models/apartments/projects.model';

import { LocationModel } from '../schema/apartment/locations.schema';
import { CityModel } from '../schema/apartment/cities.schema';

//----------------------------------------------------------CREATE--------------------------------------------

export default async function insertApartmentOrUpdate(apartment: Apartment) {
	if (apartment._id) {
		return await updateApartment(apartment._id, apartment);
	}

	if (await LocationModel.findById(apartment.location_id)) {
		assertsMongoDocId(apartment.location_id);

		const location = await LocationModel.findById(apartment.location_id);
		const location_name = location?.name!;

		const city = await CityModel.findById(location?.city_id);
		const city_id = location?.city_id.toString()!;
		const cit_name = (await CityModel.findById(city_id))?.name!;

		if (apartment.propertyType == PropertyType.COMMERCIAL.valueOf()) {
			await LocationModel.findByIdAndUpdate(location?._id, {
				commercial_property_count:
					(location?.commercial_property_count ?? 0) + 1,
			});
			await CityModel.findByIdAndUpdate(city?._id, {
				commercial_property_count: (city?.commercial_property_count ?? 0) + 1,
			});
		}

		if (apartment.propertyType == PropertyType.RESIDENTIAL.valueOf()) {
			await LocationModel.findByIdAndUpdate(location?._id, {
				residential_property_count:
					(location?.residential_property_count ?? 0) + 1,
			});
			await CityModel.findByIdAndUpdate(city?._id, {
				residential_property_count: (city?.residential_property_count ?? 0) + 1,
			});
		}

		apartment.city_name = city_id;
		apartment.city_name = cit_name;
		apartment.location_name = location_name;
		apartment.city_id = city_id;

		if (apartment.slug) {
			if (await ApartmentModel.findOne({ slug: apartment.slug })) {
				throw new Error(
					'apartment with slug ' + apartment.slug + ' already exists'
				);
			}
		}
		await new ApartmentModel(apartment).save();
	} else throw new Error('Location not found');
}

//----------------------------------------------------------DELETE------------------------------------------------
export async function removeApartment(aptId: string) {
	assertsMongoDocId(aptId);

	let apartment = (await ApartmentModel.findById(aptId))!;
	const location = await LocationModel.findById(apartment.location_id);

	const city = await CityModel.findById(location?.city_id);
	const city_id = location?.city_id.toString()!;

	if (apartment.propertyType == PropertyType.COMMERCIAL.valueOf()) {
		await LocationModel.findByIdAndUpdate(location?._id, {
			commercial_property_count: Math.max(
				(location?.commercial_property_count ?? 0) - 1,
				0
			),
		});
		await CityModel.findByIdAndUpdate(city?._id, {
			commercial_property_count: Math.max(
				(city?.commercial_property_count ?? 0) - 1,
				0
			),
		});
	}

	if (apartment.propertyType == PropertyType.RESIDENTIAL.valueOf()) {
		await LocationModel.findByIdAndUpdate(location?._id, {
			residential_property_count: Math.max(
				(location?.residential_property_count ?? 0) - 1,
				0
			),
		});
		await CityModel.findByIdAndUpdate(city?._id, {
			residential_property_count: Math.max(
				(city?.residential_property_count ?? 0) - 1,
				0
			),
		});
	}

	await ApartmentModel.findByIdAndRemove(aptId);
}

//----------------------------------------------------------Update------------------------------------------------
export async function updateApartment(id: string, request: Apartment) {
	assertsMongoDocId(id);

	//--------------Update count START----------------------------
	let apartment = (
		await ApartmentModel.find({
			_id: id,
		})
	)[0]!;
	let oldType = apartment.propertyType;
	let newType = request.propertyType;

	const location = await LocationModel.findById(apartment.location_id);
	const location_name = location?.name!;

	const city = await CityModel.findById(location?.city_id);
	const city_id = location?.city_id.toString()!;
	const cit_name = (await CityModel.findById(city_id))?.name!;

	if (oldType !== newType) {
		if (oldType == PropertyType.COMMERCIAL.valueOf()) {
			await LocationModel.findByIdAndUpdate(location?._id, {
				commercial_property_count: Math.max(
					(location?.commercial_property_count ?? 0) - 1,
					0
				),
				residential_property_count: Math.max(
					(location?.residential_property_count ?? 0) + 1,
					0
				),
			});
			await CityModel.findByIdAndUpdate(city?._id, {
				commercial_property_count: Math.max(
					(city?.commercial_property_count ?? 0) - 1,
					0
				),
				residential_property_count: Math.max(
					(city?.residential_property_count ?? 0) + 1,
					0
				),
			});
		}

		if (oldType == PropertyType.RESIDENTIAL.valueOf()) {
			await LocationModel.findByIdAndUpdate(location?._id, {
				commercial_property_count: Math.max(
					(location?.commercial_property_count ?? 0) + 1,
					0
				),
				residential_property_count: Math.max(
					(location?.residential_property_count ?? 0) - 1,
					0
				),
			});
			await CityModel.findByIdAndUpdate(city?._id, {
				commercial_property_count: Math.max(
					(city?.commercial_property_count ?? 0) + 1,
					0
				),
				residential_property_count: Math.max(
					(city?.residential_property_count ?? 0) - 1,
					0
				),
			});
		}
	}
	//--------------Update count END----------------------------

	//--------------Update city and location---------------
	request.city_name = city_id;
	request.city_name = cit_name;
	request.location_name = location_name;
	request.city_id = city_id;
	//---------------------------Update city and location END-----------
	let apt = await ApartmentModel.find({
		_id: id,
	});

	if (!apt) {
		throw new Error('Document Not found');
	}

	await ApartmentModel.findByIdAndUpdate(id, {
		$set: {
			...request,
		},
	});
}

//----------------------------------------------------------GET--------------------------------------------
export async function getApartments({
	city_id,
	location_id,
	apt_type,
	size,
	status,
	property_type,
	location_name,
	city_name,
	id,
	slug,
}: {
	city_id?: string;
	location_id?: string;
	apt_type?: string;
	size?: string;
	status?: ApartmentStatus;
	property_type?: PropertyType;
	location_name?: string;
	city_name?: string;
	id?: string;
	slug?: string;
}) {
	const mongo_filter: any = {};

	if (id) {
		return await ApartmentModel.findById(id);
	}
	if (slug) {
		return await ApartmentModel.findOne({ slug: slug });
	}
	if (city_id) {
		assertsMongoDocId(city_id);
		mongo_filter.city_id = city_id;
	}

	if (location_id) {
		assertsMongoDocId(location_id);
		mongo_filter.location_id = location_id;
	}

	if (apt_type) {
		mongo_filter.apt_type = apt_type;
	}

	if (size) {
		mongo_filter.size = {
			$elemMatch: { $size: size },
		};
	}

	if (status) {
		if (status !== ApartmentStatus.ALL) {
			mongo_filter.status = status;
		}
	}

	if (property_type) {
		if (property_type !== PropertyType.ALL) {
			mongo_filter.propertyType = property_type;
		}
	}

	let apartments = await ApartmentModel.find(mongo_filter);

	return apartments;
}

//-------------------------------GET:Search-----------------------------
export async function getApartmentsByName(q: string) {
	const regex = { $regex: q };

	const mongo_filter = {
		$or: [
			{ city_name: regex },
			{ location_name: regex },
			{ apt_type: regex },
			{ size: regex },
		],
	};

	const apartments = await ApartmentModel.find(mongo_filter);

	return apartments;
}

//------------------RefreshCount---------------------
export async function refreshCount() {
	let apartments = await ApartmentModel.find({});

	for (const apartment of apartments) {
		const location = await LocationModel.findById(apartment.location_id);

		const city = await CityModel.findById(location?.city_id);

		if (apartment.propertyType == PropertyType.COMMERCIAL.valueOf()) {
			await LocationModel.findByIdAndUpdate(location?._id, {
				commercial_property_count: Math.max(
					(location?.commercial_property_count ?? 0) + 1,
					0
				),
			});
			await CityModel.findByIdAndUpdate(city?._id, {
				commercial_property_count: Math.max(
					(city?.commercial_property_count ?? 0) + 1,
					0
				),
			});
		}

		if (apartment.propertyType == PropertyType.RESIDENTIAL.valueOf()) {
			await LocationModel.findByIdAndUpdate(location?._id, {
				residential_property_count: Math.max(
					(location?.residential_property_count ?? 0) + 1,
					0
				),
			});
			await CityModel.findByIdAndUpdate(city?._id, {
				residential_property_count: Math.max(
					(city?.residential_property_count ?? 0) + 1,
					0
				),
			});
		}
	}
}
