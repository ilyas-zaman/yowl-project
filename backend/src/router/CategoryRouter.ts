import express from 'express';
import { createCategoryController, getAllCategoriesController, getCategoryController, deleteCategoryController, updateCategoryController } from '../controller/CategoryController';

const router = express.Router();

router.post('/', createCategoryController);
router.get('/', getAllCategoriesController);
router.get('/:id', getCategoryController);
router.delete('/:id', deleteCategoryController);
router.put('/:id', updateCategoryController)

export default router;