import { Request, Response, NextFunction } from 'express';
import { getAllComments, getComment, createComment, deleteComment, updateComment, getAllCommentsByPostId } from '../service/CommentService';
import { authenticate } from '../helper';

const getAllCommentsController = async (req: Request, res: Response, next: NextFunction) => {
    try {
		authenticate(req);
		const response = await getAllComments();
		return res.send(response);
	} catch (error) {
		return next(error);
	}
}

const getAllCommentsByPostIdController = async (req: Request, res: Response, next: NextFunction) => {
    try {
		const response = await getAllCommentsByPostId(Number(req.params.id));
		if (!response) res.status(404).send({ message: 'No comment found' });
		console.log('test');
		return res.send(response);
	} catch (error) {
		return next(error);
	}
}


const createCommentController = async (req: Request, res: Response, next: NextFunction) => {
    try {
		const session = authenticate(req);
        const response = await createComment(Number(session.id), req.body);
        return res.send(response);
    } catch (error) {
        return next(error);
    }
}

const getCommentController = async (req: Request, res: Response, next: NextFunction) => {
    try {
		const session = authenticate(req);
		const response = await getComment(Number(session.id), Number(req.params.id));
		if (!response) res.status(404).send({ message: 'No comment found' });
		return res.send(response);
	} catch (error) {
		return next(error);
	}
}

const updateCommentController = async (req: Request, res: Response, next: NextFunction) => {
    try {
		const session = authenticate(req);
		const response = await updateComment(Number(session.id), Number(req.params.id), req.body);
		if (!response) res.status(404).send({ message: 'No comment found' });
		return res.send({ message: 'Comment updated successfully !' });
	} catch (error) {
		return next(error);
	}
}

const deleteCommentController = async (req: Request, res: Response, next: NextFunction) => {
    try {
		const session = authenticate(req);
		const response = await deleteComment(Number(session.id), Number(req.params.id));
		if (!response) res.status(404).send({ message: 'No comment found' });
		return res.send({ message: 'Comment deleted successfully !' });
	} catch (error) {
		return next(error);
	}
}

export { createCommentController, getAllCommentsController, getAllCommentsByPostIdController, getCommentController, deleteCommentController, updateCommentController };