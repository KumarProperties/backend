import mongoose from 'mongoose';

interface TopApartments {
	apartment_id: string[];
}

let TopApartmentSchema = new mongoose.Schema<TopApartments>({
	apartment_id: {
		type: [String],
	},
});

export let TopApartmentsModel = mongoose.model<TopApartments>(
	'trending_apartments',
	TopApartmentSchema
);
