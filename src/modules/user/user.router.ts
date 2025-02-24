import { Router } from "express";
import validateRequest from "../../app/middleware/validateRequest";
import { userValidation } from "./user.validation";
import { userController } from "./user.controller";
import auth from "../../app/middleware/auth";



const userRoute  = Router();

userRoute.post('/create-user', validateRequest(userValidation.userCreateValidationSchema), userController.createUser);
userRoute.get('/profile', auth(), userController.getProfile);
userRoute.get('/',  userController.getUser);

export default userRoute;