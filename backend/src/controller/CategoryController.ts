import { Request, Response, NextFunction } from 'express';
import { getAllCategories, createCategory, getCategory, deleteCategory, updateCategory } from '../service/CategoryService';
import { authenticate } from '../helper';



const getAllCategoriesController = async (req: Request, res: Response, next: NextFunction) => {
    try {
		const session = authenticate(req);
		const response = await getAllCategories(Number(session.id));
		return res.send(response);
	} catch (error) {
		return next(error);
	}
}

const createCategoryController = async (req: Request, res: Response, next: NextFunction) => {
    try {
		const session = authenticate(req);
        const response = await createCategory(Number(session.id), req.body);
        return res.send(response);
    } catch (error) {
        return next(error);
    }
}

const getCategoryController = async (req: Request, res: Response, next: NextFunction) => {
    try {
		const session = authenticate(req);
		const response = await getCategory(Number(session.id), Number(req.params.id));
		if (!response) res.status(404).send({ message: 'No user found' });
		return res.send(response);
	} catch (error) {
		return next(error);
	}
}

const updateCategoryController = async (req: Request, res: Response, next: NextFunction) => {
    try {
		const session = authenticate(req);
		const response = await updateCategory(Number(session.id), Number(req.params.id), req.body);
		if (!response) res.status(404).send({ message: 'No user found' });
		return res.send({ message: 'User updated successfully !' });
	} catch (error) {
		return next(error);
	}
}

const deleteCategoryController = async (req: Request, res: Response, next: NextFunction) => {
    try {
		const session = authenticate(req);
		const response = await deleteCategory(Number(session.id), Number(req.params.id));
		if (!response) res.status(404).send({ message: 'No user found' });
		return res.send({ message: 'User deleted successfully !' });
	} catch (error) {
		return next(error);
	}
}

export { getAllCategoriesController, createCategoryController, getCategoryController, deleteCategoryController, updateCategoryController };