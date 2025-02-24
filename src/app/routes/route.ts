import { Router } from "express";
import userRoute from "../../modules/user/user.router";
import authRouter from "../../modules/auth/auth.router";

const router = Router();
const moduleRoutes = [
    {
    path: '/user',
    route: userRoute, 
   
    },
    {
      path: '/auth',
      route: authRouter,
    }
];
moduleRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });

export default router;