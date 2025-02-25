import catchAsync from "../../app/utils/catchAsync";
import sendResponse from "../../app/utils/sendResponse";
import { sendMoneyService } from "./sendMoney.service";
import httpStatus from 'http-status';


const createSendMoney = catchAsync(async (req, res) => {
    const payload = req.body;
    const result = await sendMoneyService.createSendmoney(payload);
    sendResponse(res, {
      success: true,
      message: "Send Money created successfully",
      data: result,
      statusCode: httpStatus.CREATED,
    });
  });
  

export  const sendMoneyContoller = {
    createSendMoney,
  }