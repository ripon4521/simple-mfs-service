import { Router } from "express";
import validateRequest from "../../app/middleware/validateRequest";
import { balanceRequestValidation } from "./balanceRequest.validation";
import { balanceRequestController } from "./balanceRequest.controller";


const balanceRequestRouter = Router();
balanceRequestRouter.post('/cerate-balanceRequest', validateRequest(balanceRequestValidation.createBalanceRequestSchema), balanceRequestController.cerateBalanceRequest);
balanceRequestRouter.get('/', balanceRequestController.getAllBalanceRequests);

balanceRequestRouter.get('/:id', balanceRequestController.getBalanceRequestById);

balanceRequestRouter.patch('/:id', validateRequest(balanceRequestValidation.updateBalanceRequestSchema), balanceRequestController.updateBalanceRequestById);

balanceRequestRouter.delete('/:id', balanceRequestController.deleteBalanceRequestById);

export default balanceRequestRouter;