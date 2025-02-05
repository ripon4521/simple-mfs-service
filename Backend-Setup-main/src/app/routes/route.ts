import { Router } from "express";
import { recipeRoutes } from "../../modules/recipe/recipe.route";

const router = Router();
const moduleRoutes = [
    {
    path: '/recipe',
    route: recipeRoutes, 
   
    }
];
moduleRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });

export default router;