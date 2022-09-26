import { Request, Response, NextFunction } from 'express';
import { authenticate } from '../helper';
import { login, self } from '../service/AuthService';

const loginController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const response = await login(req.body.emailOrUsername, req.body.password);
		if (!response) res.status(404).send({ message: 'No user found' });
		return res.send(response);
	} catch (error) {
		return next(error);
	}
};

const selfController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const session = authenticate(req);
		const response = await self(Number(session.id));
		return res.send(response);
	} catch (error) {
		console.log('error');
		return next(error);
	}
};

export { loginController, selfController };
