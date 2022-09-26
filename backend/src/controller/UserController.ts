import { Request, Response, NextFunction } from 'express';
import { getAllUsers, getUser, createUser, deleteUser, putUser, patchUser } from '../service/UserService';
import { authenticate } from '../helper';
import { HttpStatusCode } from '../tools';

const getAllUsersController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		authenticate(req);
		const response = await getAllUsers();
		return res.send(response);
	} catch (error) {
		return next(error);
	}
};

const createUserController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const response = await createUser(req.body);
		return res.send([
			{ id: response.id },
			{ username: response.username },
			{ firstname: response.firstname },
			{ lastname: response.lastname },
			{ email: response.email },
		]);
	} catch (error) {
		return next(error);
	}
};

const getUserController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const session = authenticate(req);
		const response = await getUser(Number(session.id), Number(req.params.id));

		return res.send({ user: response, code: HttpStatusCode.OK });
	} catch (error) {
		return next(error);
	}
};

const putUserController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const session = authenticate(req);
		const response = await putUser(Number(session.id), Number(req.params.id), req.body);
		return res.send({ message: 'User updated successfully !', user: response });
	} catch (error) {
		return next(error);
	}
};

const patchUserController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const session = authenticate(req);
		const response = await patchUser(Number(session.id), Number(req.params.id), req.body);
		return res.send({ message: 'User updated successfully !', user: response });
	} catch (error) {
		return next(error);
	}
};

const deleteUserController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const session = authenticate(req);
		const response = await deleteUser(Number(session.id), Number(req.params.id));
		if (!response) res.status(404).send({ message: 'No user found' });
		return res.send({ message: 'User deleted successfully !' });
	} catch (error) {
		return next(error);
	}
};

export { createUserController, getAllUsersController, getUserController, deleteUserController, putUserController, patchUserController };
