import { Request, Response, NextFunction } from 'express';
import { getAllUsers, getUser, deleteUser, updateUser } from '../service/AdminService';
import { authenticate } from '../helper';



const getAllUsersController = async (req: Request, res: Response, next: NextFunction) => {
    try {
		const session = authenticate(req);
		// console.log(typeof session.id);  == number
		const response = await getAllUsers(Number(session.id));
		return res.send(response);
	} catch (error) {
		return next(error);
	}
}

const getUserController = async (req: Request, res: Response, next: NextFunction) => {
    try {
		const session = authenticate(req);
		const response = await getUser(Number(session.id), Number(req.params.id));
		if (!response) res.status(404).send({ message: 'No user found' });
		return res.send(response);
	} catch (error) {
		return next(error);
	}
}

const updateUserController = async (req: Request, res: Response, next: NextFunction) => {
    try {
		const session = authenticate(req);
		const response = await updateUser(Number(session.id), Number(req.params.id), req.body);
		if (!response) res.status(404).send({ message: 'No user found' });
		return res.send({ message: 'User updated successfully !' });
	} catch (error) {
		return next(error);
	}
}

const deleteUserController = async (req: Request, res: Response, next: NextFunction) => {
    try {
		const session = authenticate(req);
		const response = await deleteUser(Number(session.id), Number(req.params.id));
		if (!response) res.status(404).send({ message: 'No user found' });
		return res.send({ message: 'User deleted successfully !' });
	} catch (error) {
		return next(error);
	}
}

export { getAllUsersController, getUserController, deleteUserController, updateUserController };