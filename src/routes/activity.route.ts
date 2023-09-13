import express from 'express';
import {
	PostActivityRouter,
	GetActivitiesRoutes,
	DeleteActivitiesRoutes,
	GetActivitiesRoutesById,
} from '../controllers/activity.controller';
import { validateToken as ValidateToken } from '../middleware/auth.middleware';

export const ActivityRouter = express.Router();
ActivityRouter.get('/:id', GetActivitiesRoutesById);
ActivityRouter.put('/:id', ValidateToken, PostActivityRouter);
ActivityRouter.post('/', ValidateToken, PostActivityRouter);
ActivityRouter.get('/', GetActivitiesRoutes);
ActivityRouter.delete('/:id', ValidateToken, DeleteActivitiesRoutes);
