import express from 'express';

import {
	getProjectsRoute,
	updateProjectRoute,
	postApartmentRoute,
	deleteProjectRoute,
	aptCountsRefreshRoute,
} from '../controllers/apartment.controller';

import getAllAreasRoute from '../controllers/apartments/areas.controller';
import {
	addCitiesRoute,
	getAllCitiesRoute,
	updateCityRoute,
} from '../controllers/apartments/cities.controller';
import getAllAptSizesRoute from '../controllers/apartments/size.controller';
import getAllAptTypesRoute from '../controllers/apartments/types.controller';
import { allMimeTypes } from '../utils/mime.util';
import { UploadValidator } from '../validators/files.validator';
import {
	addLocationRoute,
	deleteLocationRoute,
	getAllLocationsRoute,
	updateLocationRoute,
} from '../controllers/apartments/locations.controller';
import { validateToken } from '../middleware/auth.middleware';
import { getApartmentsByName } from '../services/apartment.service';

import {
	deleteTrendingApartmentRoute,
	// deleteTrendingApartmentRoute,
	getTrendingApartmentRoute,
	postTrendingApartmentRoute,
	postTrendingApartmentsRoute,
} from '../controllers/apartments/trending.controller';

export const ApartmentRouter = express.Router();

const defaultFilesValidationConfig: UploadValidator = {
	min_file_count: 1,
	max_file_count: 10,
	allowed_mime_type: allMimeTypes,
};

ApartmentRouter.get('/', getProjectsRoute);
ApartmentRouter.get('/search', getApartmentsByName);
ApartmentRouter.put('/:apt_id', updateProjectRoute);
ApartmentRouter.post('/', validateToken, postApartmentRoute);
ApartmentRouter.delete('/:apartment_id', deleteProjectRoute);

ApartmentRouter.get('/apt_types', getAllAptTypesRoute);
ApartmentRouter.get('/apt_areas', getAllAreasRoute);

ApartmentRouter.get('/apt_cities', getAllCitiesRoute);
ApartmentRouter.post('/apt_cities', addCitiesRoute);
ApartmentRouter.put('/apt_cities/:city_id', updateCityRoute);

ApartmentRouter.get('/apt_locations', getAllLocationsRoute);
ApartmentRouter.post('/apt_locations', addLocationRoute);
ApartmentRouter.put('/apt_locations/:location_id', updateLocationRoute);
ApartmentRouter.delete('/apt_locations/:location_id', deleteLocationRoute);

ApartmentRouter.get('/apt_sizes', getAllAptSizesRoute);

ApartmentRouter.post('/refresh', aptCountsRefreshRoute);

//Trending
export const ApartmentTrendingRouter = express.Router();
ApartmentTrendingRouter.post('/', validateToken, postTrendingApartmentsRoute);
ApartmentTrendingRouter.post(
	'/single',
	validateToken,
	postTrendingApartmentRoute
);
ApartmentTrendingRouter.delete(
	'/single',
	validateToken,
	deleteTrendingApartmentRoute
);
ApartmentTrendingRouter.get('/', getTrendingApartmentRoute);
