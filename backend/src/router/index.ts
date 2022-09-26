import express from 'express';
import UserRouter from './UserRouter';
import AuthRouter from './AuthRouter';
import PostRouter from './PostRouter';
import CommentRouter from './CommentRouter';
import AdminRouter from './AdminRouter';
import CategoryRouter from './CategoryRouter';

const router = express.Router();

router.use('/users', AuthRouter);
router.use('/users', UserRouter);
router.use('/posts', PostRouter);
router.use('/comments', CommentRouter);
router.use('/admin', AdminRouter);
router.use('/category', CategoryRouter);

export default router;