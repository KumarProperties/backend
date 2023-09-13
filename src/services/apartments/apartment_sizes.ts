import mongoose, { Types } from 'mongoose';

import { AptSizeListingBody } from '../../models/apartments/apartment_projects';
import { assertsMongoDocId } from '../../validators/mongoose_validator';
import { ApartmentModel } from '../../schema/apartments/apartments';

interface AggregationResult {
	apt_sizes: string[];
}

export async function getApartmentSizes({
	location_id,
	apt_type,
}: {
	location_id: string;
	apt_type: string | undefined;
}): Promise<AggregationResult> {
	let filter: any = {};

	if (location_id) {
		assertsMongoDocId(location_id);
		filter.location_id = location_id;
	}

	if (apt_type) {
		filter.apt_type = apt_type;
	}

	return {
		apt_sizes: (await ApartmentModel.find(filter)).map((it) => it.size),
	};
}
