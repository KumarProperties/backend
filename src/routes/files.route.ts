import { NextFunction, Request, Response } from 'express';
import { getApartments } from '../services/apartment.service';
import { getAllActivities } from '../services/activity.service';

export async function RemoveUntrackedFilesRoute(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		let urls: (string | undefined)[] = [];

		//--------------------------APARTMENTS-----------------------------
		let allApartments = await getApartments({});
		if (Array.isArray(allApartments)) {
			allApartments?.forEach((element) => {
				urls.push(...element.title_image);
				//flat details
				let fd = element?.flat_details;
				urls.push(...fd.amenities?.images);
				urls.push(fd.specification?.bottom_image);
				urls.push(fd.specification?.top_image);
				urls.push(...fd.isometric_view?.media);

				//gallery media
				urls.push(...element?.gallery_medias);

				//layout
				urls.push(element?.layout);

				//documents
				urls.push(...element?.apartment_document?.map((it) => it.location));

				//logo
				urls.push();

				//QR images
				urls.push(...element?.certification?.qr_images);
			});
		}

		//--------------------------------ACTIVITY-----------------------------
		let activities = await getAllActivities();
		activities.forEach((element) => {
			urls.push(element.thumb);
		});

		// console.log(urls);
		res.status(200).json({
			tracked_urls_length: urls.length,
			tracked_urls: urls,
		});
	} catch (e) {
		console.error(e);
		res.status(400).send();
	}
}
