import { ApartmentModel } from '../../schema/apartment.schema';
import { City, CityModel } from '../../schema/apartment/cities.schema';
import { MongooseError } from '../../validators/mongoose.validator';

interface AggregationResult {
	cities: {
		name: string;
		city_id: string;
		commercial_property_count: number;
		residential_property_count: number;
	}[];
}

export async function getAllCities(): Promise<AggregationResult | undefined> {
	let cities = await CityModel.find({});
	return {
		cities: cities.map((it) => {
			return {
				name: it.name,
				city_id: it._id.toString(),
				commercial_property_count: it.commercial_property_count,
				residential_property_count: it.residential_property_count,
			};
		}),
	};
}

export async function addCity(city: City) {
	if (await CityModel.findOne({ name: city.name })) {
		// console.log(await CityModel.find({ name: city.name }));
		throw MongooseError.duplicate_record;
	}
	let newRecord = new CityModel(city);
	return await newRecord.save();
}

export async function updateCity(city_id: string, new_name: string) {
	if (await CityModel.findById(city_id)) {
		await CityModel.findByIdAndUpdate(city_id, {
			name: new_name,
		});

		await ApartmentModel.updateMany(
			{
				city_id: city_id,
			},
			{
				city_name: new_name,
			}
		);
	}
}
