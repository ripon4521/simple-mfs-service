import { Router } from "express";
import validateRequest from "../../app/middleware/validateRequest";
import { transctionController } from "./transction.controller";
import { transactionValidation } from "./transction.validation";


const transctionRouter = Router();

transctionRouter.post('/create-transaction', validateRequest(transactionValidation.transactionSchema), transctionController.createTransctions);
transctionRouter.delete('/:id', transctionController.deleteTransction)

export default transctionRouter;