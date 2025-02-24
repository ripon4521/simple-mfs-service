import { Router } from "express";
import validateRequest from "../../app/middleware/validateRequest";
import { userValidation } from "./user.validation";
import { userController } from "./user.controller";


const userRoute  = Router();

userRoute.post('/create-user', validateRequest(userValidation.userCreateValidationSchema), userController.createUser);

export default userRoute;