import { NextFunction, Request, Response } from 'express';
import { getApartments } from '../services/apartments/apartment';
import { url } from 'inspector';
import { getActivities, getAllActivities } from '../services/activity/activity';

export async function RemoveUntrackedFilesRoute(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		let urls: (string | undefined)[] = [];

		//--------------------------APARTMENTS-----------------------------
		let allApts = await getApartments({});
		if (Array.isArray(allApts)) {
			allApts?.forEach((element) => {
				urls.push(...element.title_image);
				//flat details
				let fd = element?.flat_details;
				urls.push(...fd.amenities?.images);
				urls.push(fd.specification?.bottom_image);
				urls.push(fd.specification?.top_image);
				urls.push(...fd.isometric_view?.media);

				//gallary media
				urls.push(...element?.gallery_medias);

				//layout
				urls.push(element?.layout);

				//documents
				urls.push(
					...element?.apartment_document?.map((it) => it.location)
				);

				//logo
				urls.push();

				//QR images
				urls.push(...element?.certification?.qr_images);
			});
		}

		//--------------------------------ACTVITY-----------------------------
		let activities = await getAllActivities();
		activities.forEach((element) => {
			urls.push(element.thumb);
		});

		console.log(urls);
		res.status(200).json({
			tracked_urls_length: urls.length,
			tracked_urls: urls,
		});
	} catch (e) {
		console.log(e);
		res.status(400).send();
	}
}
