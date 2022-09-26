import express from 'express';
import { createUserController, getAllUsersController, getUserController, deleteUserController, putUserController, patchUserController } from '../controller/UserController';

const router = express.Router();

router.post('/', createUserController);
router.get('/', getAllUsersController);
router.get('/:id', getUserController);
router.delete('/:id', deleteUserController);
router.put('/:id', putUserController)
router.patch('/:id', patchUserController)

export default router;