import { validate } from 'class-validator';
import { ErrorMessages, HttpStatusCode } from '../tools';
import { getRepository } from 'typeorm';
import { Category } from '../entity/index';
import { ServerValidationError, HttpError } from '../error';
import { User } from '../entity/index';

export interface ICategoryPayload {
	name: string;
}

export const getAllCategories = async (session: number): Promise<Category[]> => {
	if (session) {
		const adminRepository = getRepository(User);
		const admin = await adminRepository.findOne({ id: session });
		if (admin?.role == 'admin') {
			const categoryRepository = getRepository(Category);
			return categoryRepository.find({ select: ['id', 'name'] });
		} else {
			throw new HttpError(HttpStatusCode.Unauthorized, { Access: [ErrorMessages.AdminOnly] });
		}
	} else {
		throw new HttpError(HttpStatusCode.Unauthorized, { Access: [ErrorMessages.UnauthorizedMessage] });
	}
};

export const createCategory = async (session: number, payload: ICategoryPayload): Promise<Comment | unknown> => {
	if (session) {
		const adminRepository = getRepository(User);
		const admin = await adminRepository.findOne({ id: session });
		if (admin?.role == 'admin') {
			const categoryRepository = getRepository(Category);
			const category = new Category();
			category.name = payload.name;

			console.log(category);

			const errors = await validate(category);

			if (errors.length > 0) {
				throw new ServerValidationError(errors);
			} else {
				return categoryRepository.save(category);
			}
		} else {
			throw new HttpError(HttpStatusCode.Unauthorized, { Access: [ErrorMessages.AdminOnly] });
		}
	} else {
		throw new HttpError(HttpStatusCode.Unauthorized, { Access: [ErrorMessages.UnauthorizedMessage] });
	}
};

export const getCategory = async (session: number, id: number): Promise<Category | unknown> => {
	if (session) {
		const adminRepository = getRepository(User);
		const admin = await adminRepository.findOne({ id: session });
		if (admin?.role == 'admin') {
			const categoryRepository = getRepository(Category);
			const category = await categoryRepository.findOne({ id: id }, { select: ['id', 'name'] });
			if (!category) return { message: 'Category not found' };
			return category;
		} else {
			throw new HttpError(HttpStatusCode.Unauthorized, { Access: [ErrorMessages.AdminOnly] });
		}
	} else {
		throw new HttpError(HttpStatusCode.Unauthorized, { Access: [ErrorMessages.UnauthorizedMessage] });
	}
};

export const updateCategory = async (
	session: number,
	id: number,
	payload: ICategoryPayload,
): Promise<Category | unknown> => {
	if (session) {
		const adminRepository = getRepository(User);
		const admin = await adminRepository.findOne({ id: session });
		if (admin?.role == 'admin') {
			const categoryRepository = getRepository(Category);
			const category = await categoryRepository.findOne({ id: id });
			if (!category) return { message: 'Category not found' };
			category.name = payload.name;

			const errors = await validate(category);
			if (errors.length > 0) {
				throw new ServerValidationError(errors);
			} else {
				return categoryRepository.save(category);
			}
		} else {
			throw new HttpError(HttpStatusCode.Unauthorized, { Access: [ErrorMessages.AdminOnly] });
		}
	} else {
		throw new HttpError(HttpStatusCode.Unauthorized, { Access: [ErrorMessages.UnauthorizedMessage] });
	}
};

export const deleteCategory = async (session: number, id: number): Promise<Category | unknown> => {
	if (session) {
		const adminRepository = getRepository(User);
		const admin = await adminRepository.findOne({ id: session });
		if (admin?.role == 'admin') {
			const categoryRepository = getRepository(Category);
			const category = await categoryRepository.findOne({ id: id });
			if (!category) return { message: 'Category not found' };
			return await categoryRepository.remove(category);
		}else{
			throw new HttpError(HttpStatusCode.Unauthorized, { Access: [ErrorMessages.AdminOnly] });
		}
	} else {
		throw new HttpError(HttpStatusCode.Unauthorized, { Access: [ErrorMessages.UnauthorizedMessage] });
	}
};
