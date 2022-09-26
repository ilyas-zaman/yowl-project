import express from 'express';
import { getAllUsersController, getUserController, deleteUserController, updateUserController } from '../controller/AdminController';

const router = express.Router();

router.get('/', getAllUsersController);
router.get('/:id', getUserController);
router.delete('/:id', deleteUserController);
router.put('/:id', updateUserController)

export default router;