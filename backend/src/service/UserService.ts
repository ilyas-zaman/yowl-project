import { validate } from 'class-validator';
import { ErrorMessages, HttpStatusCode } from '../tools';
import { getRepository } from 'typeorm';
import { User } from '../entity/index';
import { Post } from '../entity/index';
import { Comment } from '../entity/index';
import { ServerValidationError, HttpError } from '../error';

export interface IUserPayload {
	username: string;
	firstname: string;
	lastname: string;
	email: string;
	password: string;
}

export class IPartialUserPayload {
	username?: string;
	firstname?: string;
	lastname?: string;
	email?: string;
	password?: string;
}

export const getAllUsers = async (): Promise<User[]> => {
	const userRepository = getRepository(User);
	return userRepository.find({ select: ['username', 'firstname', 'lastname'] });
};

export const createUser = async (payload: IUserPayload): Promise<User> => {
	const userRepository = getRepository(User);
	const user = new User();

	user.email = payload.email;
	user.username = payload.username;
	user.firstname = payload.firstname;
	user.lastname = payload.lastname;
	user.password = payload.password;

	if (await userRepository.findOne({ email: payload.email }))
		throw new HttpError(HttpStatusCode.Conflict, { email: [ErrorMessages.AlreadyExist] });

	if (await userRepository.findOne({ username: payload.username }))
		throw new HttpError(HttpStatusCode.Conflict, { username: [ErrorMessages.AlreadyExist] });

	const errors = await validate(user);

	if (errors.length > 0) throw new ServerValidationError(errors);

	user.password = user.setPassword(user.password);
	return userRepository.save(user);
};

export const getUser = async (session: number, id: number): Promise<User> => {
	const userRepository = getRepository(User);
	let user: User | undefined = undefined;

	if (session === id)
		user = await userRepository.findOne(
			{ id: id },
			{ select: ['id', 'username', 'firstname', 'lastname', 'email', 'role'] },
		);
	else user = await userRepository.findOne({ id: id }, { select: ['username', 'firstname', 'lastname'] });

	if (!user) throw new HttpError(HttpStatusCode.NotFound, { user: [ErrorMessages.DoesNotExist] });

	return user;
};

export const putUser = async (session: number, id: number, payload: IUserPayload): Promise<User> => {
	const userRepository = getRepository(User);

	if (session === id) {
		const user = await userRepository.findOne({ id: id });

		if (!user) throw new HttpError(HttpStatusCode.NotFound, { user: [ErrorMessages.DoesNotExist] });

		user.email = payload.email;
		user.username = payload.username;
		user.firstname = payload.firstname;
		user.lastname = payload.lastname;
		user.password = payload.password;

		if (await userRepository.findOne({ email: payload.email }))
			throw new HttpError(HttpStatusCode.Conflict, { email: [ErrorMessages.AlreadyExist] });

		if (await userRepository.findOne({ username: payload.username }))
			throw new HttpError(HttpStatusCode.Conflict, { username: [ErrorMessages.AlreadyExist] });

		const errors = await validate(user);

		if (errors.length > 0) throw new ServerValidationError(errors);

		user.password = user.setPassword(user.password);
		return userRepository.save(user);
	} else throw new HttpError(HttpStatusCode.Unauthorized, { Access: [ErrorMessages.UnauthorizedMessage] });
};

export const patchUser = async (session: number, id: number, payload: IPartialUserPayload): Promise<User> => {
	const userRepository = getRepository(User);

	if (session === id) {
		const user = await userRepository.findOne({ id: id });

		if (!user) throw new HttpError(HttpStatusCode.NotFound, { user: [ErrorMessages.DoesNotExist] });

		if (payload.email) {
			user.email = payload.email;
			if (await userRepository.findOne({ email: payload.email }))
				throw new HttpError(HttpStatusCode.Conflict, { email: [ErrorMessages.AlreadyExist] });
		}

		if (payload.username) {
			user.username = payload.username;
			if (await userRepository.findOne({ username: payload.username }))
				throw new HttpError(HttpStatusCode.Conflict, { username: [ErrorMessages.AlreadyExist] });
		}

		if (payload.firstname) user.firstname = payload.firstname;
		if (payload.lastname) user.lastname = payload.lastname;


		if (payload.password) {
			user.password = payload.password;
			const errors = await validate(user);
			if (errors.length > 0) throw new ServerValidationError(errors);
			user.password = user.setPassword(user.password);
		}else{
			const errors = await validate(user);
			if (errors.length > 1) throw new ServerValidationError(errors);
		}

		return userRepository.save(user);
	} else throw new HttpError(HttpStatusCode.Unauthorized, { Access: [ErrorMessages.UnauthorizedMessage] });
};

export const deleteUser = async (session: number, id: number): Promise<User | undefined> => {
	if (session == id) {
		const userRepository = getRepository(User);
		const user = await userRepository.findOne({ id: id });
		if (!user) throw new HttpError(HttpStatusCode.NotFound, { user: [ErrorMessages.DoesNotExist] });
		if (user) {
			const postRepository = getRepository(Post);
			const postsOfTheUser = await postRepository.find({ user_id: id });
			if (typeof postsOfTheUser == 'object') {
				const commentRepository = getRepository(Comment);
				postsOfTheUser.map(async (test) => {
					console.log('here');
					const commentsLinkedToThePost = await commentRepository.find({ post_id: test.id });
					console.log(test.id);
					if (commentsLinkedToThePost) await commentRepository.remove(commentsLinkedToThePost);
					if (postsOfTheUser) await postRepository.remove(postsOfTheUser);
				});
				const commentsLinkedToTheUser = await commentRepository.find({ user_id: id });
				if (commentsLinkedToTheUser) await commentRepository.remove(commentsLinkedToTheUser);
				return await userRepository.remove(user);
			}
		}
	} else {
		throw new HttpError(HttpStatusCode.Unauthorized, { Access: [ErrorMessages.UnauthorizedMessage] });
	}
};
