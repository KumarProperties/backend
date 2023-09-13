import express from 'express';
import {
	PostActivityRouter,
	GetActivitesRoutes,
	DeleteActivitesRoutes,
	GetActivitesRoutesById,
} from '../controllers/activity/activity';
import { validateToken as ValidateToken } from '../middleware/auth_middleware';

export const ActivityRouter = express.Router();
ActivityRouter.get('/:id', GetActivitesRoutesById);
ActivityRouter.put('/:id', ValidateToken, PostActivityRouter);
ActivityRouter.post('/', ValidateToken, PostActivityRouter);
ActivityRouter.get('/', GetActivitesRoutes);
ActivityRouter.delete('/:id', ValidateToken, DeleteActivitesRoutes);
