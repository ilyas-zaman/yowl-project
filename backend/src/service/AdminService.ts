import { ErrorMessages, HttpStatusCode } from '../tools';
import { getRepository } from 'typeorm';
import { User } from '../entity/index';
import { Post } from '../entity/index';
import { Comment } from '../entity/index';
import { HttpError } from '../error';
import { UserRole } from '../entity/User';

export interface IAdminPayload {
	role: UserRole;
}

export const getAllUsers = async (session: number): Promise<User[] | unknown> => {
	if (session) {
		const adminRepository = getRepository(User);
		const admin = await adminRepository.findOne({ id: session });
		if (admin?.role == 'admin') {
			const userRepository = getRepository(User);
			return userRepository.find({ select: ['id', 'username', 'firstname', 'lastname', 'email', 'role'] });
		} else {
			throw new HttpError(HttpStatusCode.Unauthorized, { Access: [ErrorMessages.AdminOnly] });
		}
	} else {
		throw new HttpError(HttpStatusCode.Unauthorized, { Access: [ErrorMessages.UnauthorizedMessage] });
	}
};

export const getUser = async (session: number, id: number): Promise<User | unknown> => {
	if (session) {
		const adminRepository = getRepository(User);
		const admin = await adminRepository.findOne({ id: session });
		if (admin?.role == 'admin') {
			const userRepository = getRepository(User);
			const user = await userRepository.findOne(
				{ id: id },
				{ select: ['id', 'username', 'firstname', 'lastname', 'email', 'role'] },
			);
			if (!user) return { message: 'User not found' };
			return user;
		} else {
			throw new HttpError(HttpStatusCode.Unauthorized, { Access: [ErrorMessages.AdminOnly] });
		}
	} else {
		throw new HttpError(HttpStatusCode.Unauthorized, { Access: [ErrorMessages.UnauthorizedMessage] });
	}
};

export const updateUser = async (session: number, id: number, payload: IAdminPayload): Promise<User | unknown> => {
	if (session) {
		const adminRepository = getRepository(User);
		const admin = await adminRepository.findOne({ id: session });
		if (admin?.role == 'admin') {
			const userRepository = getRepository(User);
			const user = await userRepository.findOne({ id: id });
			if (!user) return { message: 'User not found' };
			user.role = payload.role;
			return userRepository.save(user);
		} else {
			throw new HttpError(HttpStatusCode.Unauthorized, { Access: [ErrorMessages.AdminOnly] });
		}
	} else {
		throw new HttpError(HttpStatusCode.Unauthorized, { Access: [ErrorMessages.UnauthorizedMessage] });
	}
};

export const deleteUser = async (session: number, id: number): Promise<User | unknown> => {
	if (session) {
		const adminRepository = getRepository(User);
		const admin = await adminRepository.findOne({ id: session }, { select: ['role'] });
		if (admin?.role == 'admin') {
			const userRepository = getRepository(User);
			const user = await userRepository.findOne({ id: id });
			if (!user) return { message: 'User not found' };
			if (user) {
				const postRepository = getRepository(Post);
				const postsOfTheUser = await postRepository.find({ user_id: id });
				if (typeof postsOfTheUser == 'object') {
					postsOfTheUser.map(async (test) => {
						const commentRepository = getRepository(Comment);
						const commentsLinkedToThePost = await commentRepository.find({ post_id: test.id });
						await commentRepository.remove(commentsLinkedToThePost);
						await postRepository.remove(postsOfTheUser);
					});
					return await userRepository.remove(user);
				}
			}
		} else {
			throw new HttpError(HttpStatusCode.Unauthorized, { Access: [ErrorMessages.AdminOnly] });
		}
	} else {
		throw new HttpError(HttpStatusCode.Unauthorized, { Access: [ErrorMessages.UnauthorizedMessage] });
	}
};
