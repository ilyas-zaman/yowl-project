import { ErrorMessages, HttpStatusCode } from '../tools';
import { getRepository } from 'typeorm';
import { User } from '../entity/index';
import { HttpError } from '../error';

export const login = async (emailOrUsername: string, password: string): Promise<unknown> => {
	if (!emailOrUsername) {
		throw new HttpError(HttpStatusCode.BadRequest, { email: [ErrorMessages.IsRequiredOrEmpty] });
	} else {
		if (!password) {
			throw new HttpError(HttpStatusCode.BadRequest, { password: [ErrorMessages.IsRequiredOrEmpty] });
		} else {
			const userRepository = getRepository(User);
			const userByEmail = await userRepository.findOne({ email: emailOrUsername }, {select: ['id', 'username', 'firstname', 'lastname', 'email', 'password', 'role']});
			const userByUsername = await userRepository.findOne({ username: emailOrUsername }, {select: ['id', 'username', 'firstname', 'lastname', 'email', 'password', 'role']});
			if (userByEmail) {
				if (!userByEmail.isValidPassword(password))
					throw new HttpError(HttpStatusCode.Unauthorized, { password: [ErrorMessages.IsNotValid] });
				return {
					access_token: userByEmail.generateJWT(),
				};
			}else if (userByUsername) {
				if (!userByUsername.isValidPassword(password))
					throw new HttpError(HttpStatusCode.Unauthorized, { password: [ErrorMessages.IsNotValid] });
				return {
					access_token: userByUsername.generateJWT(),
				};
			} else {
				throw new HttpError(HttpStatusCode.NotFound, { user: [ErrorMessages.DoesNotExist] });
			}
		}
	}
};

export const self = async (session: number): Promise<unknown> => {
	if(session) {
		const userRepository = getRepository(User);
		return await userRepository.findOne({ id: session }, {select: ["id", "username", "firstname", "lastname", "email", "password", "role"]});
	} else {
		console.log('errorrrrrr');
		throw new HttpError(HttpStatusCode.NotFound);	
	}
}
