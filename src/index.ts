import express, { NextFunction, Request, Response } from 'express';

import { indexRouter as apiRouter } from './routes';
import { setUpMiddleWare as useCommonMiddleware } from './middleware';
import { connectToDatabase } from './configs/mongodb.config';

import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

let port = process.env.PORT;
let app = express();

const responseInterceptor = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const originalSend = res.json;

	res.json = function (body: any): Response<any, Record<string, any>> {
		const modifiedBody = {
			data: body,
			status: res.statusCode,
			isSuccessful: res.statusCode >= 200 && res.statusCode < 300,
		};
		return originalSend.call(this, modifiedBody);
	};

	next();
};

app.use(responseInterceptor);

app.use(
	cors({
		origin: '*',
	})
);

useCommonMiddleware(app);

app.use(apiRouter);

app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
	console.log(error);
	res.status(500).send({
		error_message: error ?? 'Oops something went wrong',
	});
});

app.listen(port, () => {
	console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

const onConnectToDB = () => {
	console.log('⚡️[server]: Connected To DataBase');
};

connectToDatabase((err) => {
	console.log(err);
}, onConnectToDB);
