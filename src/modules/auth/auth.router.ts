import { Router } from "express";
import { AuthValidation } from "./auth.validation";
import validateRequest from "../../app/middleware/validateRequest";
import { userValidation } from "../user/user.validation";
import { authController } from "./auth.controller";


const authRouter = Router();

authRouter.post('/register', validateRequest(userValidation.userCreateValidationSchema), authController.register);
authRouter.post('/login', validateRequest(AuthValidation.loginValidationSchema), authController.login);



export default authRouter;