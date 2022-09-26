import { validate } from 'class-validator';
import { ErrorMessages, HttpStatusCode } from '../tools';
import { getRepository } from 'typeorm';
import { Post } from '../entity/index';
import { Comment } from '../entity/index';
import { Category } from '../entity/index';
import { ServerValidationError, HttpError } from '../error';

export interface IPostPayload {
	title: string;
	content: string;
	url: string;
	category_id: number;
}

export const getAllPosts = async (): Promise<Post[] | unknown> => {
	const postRepository = getRepository(Post);
	return await postRepository.find({ 
		select: ['id', 'title', 'content', 'url', 'category_id', 'user_id', 'created_at'],
		relations: ["user", "category"],
	});
};

export const getAllUserPosts = async (session: number): Promise<Post[]> => {
	const postRepository = getRepository(Post);
	return postRepository.find({ user_id: session });
};

export const createPost = async (session: number, payload: IPostPayload): Promise<Post> => {
	const postRepository = getRepository(Post);
	const post = new Post();
	post.title = payload.title;
	post.content = payload.content;
	post.url = payload.url;
	post.category_id = Number(payload.category_id);
	post.user_id = session;

	console.log(post);

	const categoryRepository = getRepository(Category);
	const category = await categoryRepository.findOne({ id: payload.category_id });
	if (category) {
		const errors = await validate(post);
		if (errors.length > 0) {
			throw new ServerValidationError(errors);
		} else {
			return postRepository.save(post);
		}
	}else{
		throw new HttpError(HttpStatusCode.BadRequest, { category_id: [ErrorMessages.DoesNotExist] });
	}
};

export const getPost = async (session: number, id: number): Promise<Post | undefined> => {
	if (session) {
		const postRepository = getRepository(Post);
		const post = await postRepository.findOne(
			{ id: id },
			{ select: ['title', 'content', 'url', 'category_id', 'created_at', 'user_id'] },
		);
		console.log(post);
		if (!post) throw new HttpError(HttpStatusCode.NotFound, { post: [ErrorMessages.DoesNotExist] });
		if (session == post?.user_id) return post;
	} else {
		throw new HttpError(HttpStatusCode.Unauthorized, { Access: [ErrorMessages.UnauthorizedMessage] });
	}
};

export const updatePost = async (session: number, id: number, payload: IPostPayload): Promise<Post | undefined> => {
	if (session) {
		const postRepository = getRepository(Post);
		const post = await postRepository.findOne({ id: id });
		if (!post) throw new HttpError(HttpStatusCode.NotFound, { post: [ErrorMessages.DoesNotExist] });
		if (session == post?.user_id) {
			post.title = payload.title;
			post.content = payload.content;
			post.url = payload.url;
			post.category_id = Number(payload.category_id);
			post.user_id = session;

			const categoryRepository = getRepository(Category);
			const category = await categoryRepository.findOne({ id: payload.category_id });
			if (category) {

			const errors = await validate(post);
				if (errors.length > 0) {
					throw new ServerValidationError(errors);
				} else {
					return postRepository.save(post);
				}
			}else{
				throw new HttpError(HttpStatusCode.BadRequest, { category_id: [ErrorMessages.DoesNotExist] });
			}
		}
	} else {
		throw new HttpError(HttpStatusCode.Unauthorized, { Access: [ErrorMessages.UnauthorizedMessage] });
	}
};

export const deletePost = async (session: number, id: number): Promise<Post | undefined> => {
	if (session) {
		const postRepository = getRepository(Post);
		const post = await postRepository.findOne({ id: id });
		if (!post) throw new HttpError(HttpStatusCode.NotFound, { post: [ErrorMessages.DoesNotExist] });
		if (session == post?.user_id){
			const commentRepository = getRepository(Comment);
			const commentsLinkedToThePost = await commentRepository.find({ post_id: id })
			await commentRepository.remove(commentsLinkedToThePost);
			return await postRepository.remove(post);
		} 
	} else {
		throw new HttpError(HttpStatusCode.Unauthorized, { Access: [ErrorMessages.UnauthorizedMessage] });
	}
};
