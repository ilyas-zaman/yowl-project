import express from 'express';
import { loginController, selfController } from '../controller/AuthController';

const router = express.Router();

router.post('/login', loginController)
router.get('/self', selfController)

export default router;