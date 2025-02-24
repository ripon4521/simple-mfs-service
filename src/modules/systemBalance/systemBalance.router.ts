import { Router } from "express";
import { systemBalanceController } from "./systemBalance.controller";


const systemBalanceRouter = Router();

systemBalanceRouter.get('/', systemBalanceController.getSystemBalance);

systemBalanceRouter.post('/:id', systemBalanceController.updateSystemBalance);
systemBalanceRouter.delete('/:id', systemBalanceController.deleteSystemBalance)
export default systemBalanceRouter;