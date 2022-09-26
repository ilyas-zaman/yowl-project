import express from 'express';
import { createPostController, getAllPostsController, getPostController, deletePostController, updatePostController, getAllUserPostsController } from '../controller/PostController';

const router = express.Router();

router.post('/', createPostController);
router.get('/', getAllPostsController);
router.get('/user', getAllUserPostsController);
router.get('/:id', getPostController);
router.delete('/:id', deletePostController);
router.put('/:id', updatePostController);

export default router;