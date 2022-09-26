import express from 'express';
import { createCommentController, getAllCommentsController, getAllCommentsByPostIdController, getCommentController, deleteCommentController, updateCommentController } from '../controller/CommentController';

const router = express.Router();

router.post('/', createCommentController);
router.get('/', getAllCommentsController);
router.get('/post/:id', getAllCommentsByPostIdController);
router.get('/:id', getCommentController);
router.delete('/:id', deleteCommentController);
router.put('/:id', updateCommentController);

export default router;