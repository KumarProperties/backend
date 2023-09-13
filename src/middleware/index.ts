import express, { NextFunction, Request, Response } from 'express';
import * as core from 'express-serve-static-core';

export function setUpMiddleWare(app: core.Express) {
	app.use(express.json());
}
