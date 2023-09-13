import mongoose from 'mongoose';

import { AptAreasRequestBody } from '../../models/apartments/apartment_projects';

// const City = mongoose.model("City", citySchema);

interface AreaResult {
	area: string[];
}

export async function getAllAreas(
	filters: AptAreasRequestBody
): Promise<AreaResult | undefined> {
	throw '';
	// let city = await CityModel.findOne({
	//   city: filters.city,
	// }).exec();

	// return {
	//   area:
	//     (await city?.populate("locations"))?.locations.map(
	//       (it) => (it as Location).area
	//     ) ?? [],
	// };
}
