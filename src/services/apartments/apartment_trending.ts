import { TopApartmentsModel } from '../../schema/apartments/apartment_trending';
import { Apartment, ApartmentModel } from '../../schema/apartments/apartments';

async function getOrCreate() {
	let single = await TopApartmentsModel.findOne({});
	if (single) {
		return single;
	}
	return await new TopApartmentsModel({}).save();
}

export async function addApartmentsToTrendingList(aptId: string[]) {
	const _id = (await getOrCreate())._id.toString();
	let savedRec = await TopApartmentsModel.findByIdAndUpdate(_id, {
		apartment_id: [...new Set(aptId)],
	});
	return savedRec;
}
export async function addApartmentToTrendingList(aptId: string) {
	const apt = await getOrCreate();
	apt.apartment_id.push(aptId);
	let savedRec = await TopApartmentsModel.findByIdAndUpdate(apt._id, {
		apartment_id: [...new Set(apt.apartment_id)],
	});
	return savedRec;
}

export async function removeApartmentFromTrendingList(aptId: string) {
	const apt = await getOrCreate();
	console.log(apt.apartment_id)
	apt.apartment_id = apt.apartment_id.filter((it) => {
		return it.trim() !== aptId.trim();
	});
	console.log(apt.apartment_id);
	let savedRec = await TopApartmentsModel.findByIdAndUpdate(apt._id, {
		apartment_id: apt.apartment_id,
	});
	return savedRec;
}

export async function getAllTrendingApartments() {
	const aptIds = (await getOrCreate()).apartment_id;
	const apartments: Apartment[] = [];
	for (let i = 0; i < aptIds.length; i++) {
		let apt = await ApartmentModel.findById(aptIds[i]);
		if (apt) {
			apartments.push(apt);
		} else {
			console.log('apartment with id' + aptIds[i] + ' not found');
		}
	}
	return apartments;
}
