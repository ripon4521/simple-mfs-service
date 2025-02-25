import { JwtPayload } from "jsonwebtoken";
import catchAsync from "../../app/utils/catchAsync";

import UserModel from "../user/user.model";
import { transctionService } from "./transction.service";
import httpStatus from 'http-status';
import sendResponse from "../../app/utils/sendResponse";

const createTransctions = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await transctionService.createTransction(payload);
  sendResponse(res, {
    success: true,
    message: "Transaction created successfully",
    data: result,
    statusCode: httpStatus.CREATED,
  });
});

const deleteTransction = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await transctionService.deleteTransaction(id);
  sendResponse(res, {
    success: true,
    message: "Transaction deleted successfully",
    data: result,
    statusCode: httpStatus.OK,
  });
});



const getTransctions = catchAsync(async (req, res) => {
    
    const result = await transctionService.getTransactions();
  
    sendResponse(res, {
      success: true,
      message: "Transactions fetched successfully",
      data: result,
      statusCode: httpStatus.OK,
    });
  });
  
  
export const transctionController = {
  createTransctions,
  deleteTransction,
  getTransctions,
};
