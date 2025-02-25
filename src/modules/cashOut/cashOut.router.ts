import { Router } from "express";
import validateRequest from "../../app/middleware/validateRequest";
import { cashOutValidation } from "./cashOut.validation";
import createCashoutController from "./cashOut.controller";



const cashOutRoute = Router();

cashOutRoute.post('/create-cashout', validateRequest(cashOutValidation.createCashOutValidation), createCashoutController);

export default cashOutRoute;