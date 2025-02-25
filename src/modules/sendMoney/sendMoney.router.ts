import { Router } from "express";
import validateRequest from "../../app/middleware/validateRequest";
import { sendMoneyValidation } from "./sendMoney.validation";
import { sendMoneyContoller } from "./sendMoney.controller";



const sendMoneyRouter = Router();

sendMoneyRouter.post('/create-sendmoney', validateRequest(sendMoneyValidation.createSendMoneyValidation), sendMoneyContoller.createSendMoney);


export default sendMoneyRouter;