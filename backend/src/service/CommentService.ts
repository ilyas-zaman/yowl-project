import { validate } from 'class-validator';
import { ErrorMessages, HttpStatusCode } from '../tools';
import { getRepository } from 'typeorm';
import { Comment } from '../entity/index';
import { Post } from '../entity/index';
import { ServerValidationError, HttpError } from '../error';

export interface ICommentPayload {
	content: string;
	post_id: number;
}

export const getAllComments = async (): Promise<Comment[]> => {
	const commentRepository = getRepository(Comment);
	return commentRepository.find({ select: ['content', 'post_id'] });
};

export const getAllCommentsByPostId = async (id: number): Promise<Comment[]> => {
	const commentRepository = getRepository(Comment);
	return await commentRepository.find({
		where: {post_id: id},
		relations: ['user']
	});
};

export const createComment = async (session: number, payload: ICommentPayload): Promise<Comment | unknown> => {
	if (session) {
		const commentRepository = getRepository(Comment);
		const comment = new Comment();
		comment.content = payload.content;
		comment.post_id = Number(payload.post_id);
		comment.user_id = session;
		console.log(comment);

		const postRepository = getRepository(Post);
		const postExist = await postRepository.findOne({ id: payload.post_id });
		if (postExist) {
			const errors = await validate(comment);

			if (errors.length > 0) {
				throw new ServerValidationError(errors);
			} else {
				return commentRepository.save(comment);
			}
		}else{
			throw new HttpError(HttpStatusCode.BadRequest, { post_id: [ErrorMessages.DoesNotExist] });
		}
	}else{
		throw new HttpError(HttpStatusCode.Unauthorized, { Access: [ErrorMessages.UnauthorizedMessage] });
	}
};

export const getComment = async (session: number, id: number): Promise<Comment | unknown> => {
	if (session) {
		const commentRepository = getRepository(Comment);
		const comment = await commentRepository.findOne({ id: id }, { select: ['content', 'post_id'] });
		if (!comment) return { message: 'Post not found' };
		if (session == comment?.user_id) return comment;
	} else {
		throw new HttpError(HttpStatusCode.Unauthorized, { Access: [ErrorMessages.UnauthorizedMessage] });
	}
};

export const updateComment = async (
	session: number,
	id: number,
	payload: ICommentPayload,
): Promise<Comment | unknown> => {
	if (session) {
		const commentRepository = getRepository(Comment);
		const comment = await commentRepository.findOne({ id: id });
		if (!comment) return { message: 'Post not found' };
		if (session == comment?.user_id) {
			comment.content = payload.content;
			comment.post_id = payload.post_id;
			comment.user_id = session;

			const errors = await validate(comment);
			if (errors.length > 0) {
				throw new ServerValidationError(errors);
			} else {
				return commentRepository.save(comment);
			}
		}
	} else {
		throw new HttpError(HttpStatusCode.Unauthorized, { Access: [ErrorMessages.UnauthorizedMessage] });
	}
};

export const deleteComment = async (session: number, id: number): Promise<Comment | unknown> => {
	if (session) {
		const commentRepository = getRepository(Comment);
		const comment = await commentRepository.findOne({ id: id });
		if (!comment) return { message: 'Post not found' };
		if (session == comment?.user_id) return await commentRepository.remove(comment);
	} else {
		throw new HttpError(HttpStatusCode.Unauthorized, { Access: [ErrorMessages.UnauthorizedMessage] });
	}
};
