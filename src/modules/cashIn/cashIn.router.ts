import { Router } from "express";
import validateRequest from "../../app/middleware/validateRequest";
import { cashInValidation } from "./cashIn.validation";
import createCashInController from "./cashIn.controller";

const cashInRouter = Router();
cashInRouter.post('/create-cashIn', validateRequest(cashInValidation.createCashInValidation), createCashInController);

export default cashInRouter;