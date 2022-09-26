import 'reflect-metadata';
import { createConnection } from 'typeorm';
import express, { Application, NextFunction, Response, Request } from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import { HttpError, ServerValidationError } from './error';
import { HttpStatusCode } from './tools';
import Router from './router';
import cors from "cors";

const app: Application = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('tiny'));
app.use(express.static('public'));
app.use(cors());

app.use(Router);

app.use(function (err: Error, req: Request, res: Response, next: NextFunction) {
	if (err instanceof ServerValidationError)
		res.status(HttpStatusCode.UnprocessableEntity).json({ message: 'Validation failed', details: err });
	else {
		return next(err);
	}
});

app.use(function (err: Error, req: Request, res: Response, next: NextFunction) {
	if (err instanceof HttpError)
		res.status(err.code).json(err.errors);
	else {
		return next(err);
	}
});

app.use(function (err: Error, req: Request, res: Response, next: NextFunction) {
	console.error(err);
	return res.status(HttpStatusCode.InternalServerError).json({ message: 'Internal Server Error' });
});

createConnection()
	.then((connection) => {
		app.listen(8000, () => {
			console.log(`Listening at http://localhost:8000`);
		});
	})
	.catch((err) => {
		console.log('ERROR IN THE CONNECTION TO THE DB', err);
		process.exit(1);
	});

