import express from 'express';

import {
	getProjectsRoute,
	updateProjectRoute,
	postApartmentRoute,
	deleteProjectRoute,
	aptCountsRefreshRoute,
} from '../controllers/apartments/apartment';

import getAllAreasRoute from '../controllers/apartments/apartment_areas';
import {
	addCitiesRoute,
	getAllCitiesRoute,
	updateCityRoute,
} from '../controllers/apartments/apartment_cities';
import getAllAptSizesRoute from '../controllers/apartments/apartment_size';
import getAllAptTypesRoute from '../controllers/apartments/apartment_types';
import { allMimeTypes } from '../utils/mime';
import { UploadValidator } from '../validators/files_validator';
import {
	addLocationRoute,
	deleteLocationRoute,
	getAllLocationsRoute,
	updateLocationRoute,
} from '../controllers/apartments/apartment_locations';
import { validateToken } from '../middleware/auth_middleware';
import { getApartmentsByName } from '../services/apartments/apartment';
import { deleteLocation } from '../services/apartments/apartment_locations';
import {
	deleteTrendingApartmentRoute,
	// deleteTrendingApartmentRoute,
	getTrendingApartmentRoute,
	postTrendingApartmentRoute,
	postTrendingApartmentsRoute,
} from '../controllers/apartments/apartment_trending';

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
ApartmentTrendingRouter.post('/single', validateToken, postTrendingApartmentRoute);
ApartmentTrendingRouter.delete(
	'/single',
	validateToken,
	deleteTrendingApartmentRoute
);
ApartmentTrendingRouter.get('/', getTrendingApartmentRoute);
