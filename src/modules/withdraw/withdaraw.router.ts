import { Router } from "express";
import validateRequest from "../../app/middleware/validateRequest";
import { withdrawValidation } from "./withdraw.validation";
import { withdrawController } from "./withdraw.controller";


const withdrawRouter = Router();
withdrawRouter.post('/create-withdraw', validateRequest(withdrawValidation.createWithdrawSchema), withdrawController.cerateWithdraw);
withdrawRouter.get('/', withdrawController.getAllWithdraw);
withdrawRouter.get('/:id', withdrawController.getSingleWithdraw);
withdrawRouter.patch('/:id', withdrawController.updateWithdraw);
withdrawRouter.delete('/:id', withdrawController.deleteWWithdraw)

export default withdrawRouter;