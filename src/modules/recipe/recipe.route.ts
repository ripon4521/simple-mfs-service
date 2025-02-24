import express from 'express';
import validateRequest from '../../app/middleware/validateRequest';
import { receipeValidation } from './recipe.validation';
import { rcipeController } from './recipe.controller';

const router = express.Router();
router.post('/create-recipe',validateRequest(receipeValidation.createRecipeValidationSchema),rcipeController.createRecipe);
router.get('/', rcipeController.getAllRecipe);
router.get('/:recipeId', rcipeController.getRecipeById);
router.delete('/:recipeId', rcipeController.deleteRecipe);
router.patch('/:recipeId', validateRequest(receipeValidation.updateRecipeValidationSchema), rcipeController.updateRecipe);

export const recipeRoutes = router;