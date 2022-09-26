import { Request, Response, NextFunction } from 'express';
import { getAllPosts, getPost, createPost, deletePost, updatePost, getAllUserPosts } from '../service/PostService';
import { authenticate } from '../helper';



const getAllPostsController = async (req: Request, res: Response, next: NextFunction) => {
    try {
		const response = await getAllPosts();
		console.log(response);
		return res.send(response);
	} catch (error) {
		return next(error);
	}
}

const getAllUserPostsController = async (req: Request, res: Response, next: NextFunction) => {
    try {
		const session = authenticate(req);
		const response = await getAllUserPosts(Number(session.id));
		return res.send(response);
	} catch (error) {
		return next(error);
	}
}


const createPostController = async (req: Request, res: Response, next: NextFunction) => {
    try {
		const session = authenticate(req);
        const response = await createPost(Number(session.id), req.body);
        return res.send(response);
    } catch (error) {
        return next(error);
    }
}

const getPostController = async (req: Request, res: Response, next: NextFunction) => {
    try {
		const session = authenticate(req);
		console.log(session.id);
		console.log(req.params.id);
		const response = await getPost(Number(session.id), Number(req.params.id));
		if (!response) res.status(404).send({ message: 'No post found' });
		return res.send(response);
	} catch (error) {
		return next(error);
	}
}

const updatePostController = async (req: Request, res: Response, next: NextFunction) => {
    try {
		const session = authenticate(req);
		const response = await updatePost(Number(session.id), Number(req.params.id), req.body);
		if (!response) res.status(404).send({ message: 'No post found' });
		return res.send({ message: 'Post updated successfully !', post: response  });
	} catch (error) {
		return next(error);
	}
}

const deletePostController = async (req: Request, res: Response, next: NextFunction) => {
    try {
		const session = authenticate(req);
		const response = await deletePost(Number(session.id), Number(req.params.id));
		if (!response) res.status(404).send({ message: 'No post found' });
		return res.send({ message: 'Post deleted successfully !', post: response });
	} catch (error) {
		return next(error);
	}
}

export { createPostController, getAllPostsController, getAllUserPostsController, getPostController, deletePostController, updatePostController };