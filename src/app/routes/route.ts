import { Router } from "express";
import userRoute from "../../modules/user/user.router";
import authRouter from "../../modules/auth/auth.router";
import transctionRouter from "../../modules/transction/transction.router";

const router = Router();
const moduleRoutes = [
    {
    path: '/user',
    route: userRoute, 
   
    },
    {
      path: '/auth',
      route: authRouter,
    },{
      path:'/transction',
      route: transctionRouter
    }
];
moduleRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });

export default router;