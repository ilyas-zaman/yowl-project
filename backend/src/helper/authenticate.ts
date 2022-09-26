import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import jwtConfig from '../config/jwtConfig';
import { HttpError } from '../error';
import { HttpStatusCode, ErrorMessages } from '../tools';

type Session = {
	id: string;
};

function extractJWT(authorization: string): undefined | string {
	const parsedAuthorization = authorization.split('Bearer ');

	if (parsedAuthorization.length === 2) return parsedAuthorization[1];
	return undefined;
}

export const authenticate = (req: Request): Session => {
	let token;

	if (req.headers.authorization && (token = extractJWT(req.headers.authorization))) {
		try {
			const payload = jwt.verify(token, jwtConfig.jwtSecret);
			if (typeof payload !== 'string' && payload.id && payload.exp) {
				if(Date.now() >= payload.exp * 1000){
					throw new HttpError(HttpStatusCode.Unauthorized, { Authorization: [ErrorMessages.TokenInvalidOrExpired] });
				}else{
					return {id: payload.id};
				}
			}
		} catch {
			throw new HttpError(HttpStatusCode.Unauthorized, { Authorization: [ErrorMessages.TokenInvalidOrExpired] });
		}
	}
	throw new HttpError(HttpStatusCode.Unauthorized, { Authorization: [ErrorMessages.TokenEmpty] });
};
