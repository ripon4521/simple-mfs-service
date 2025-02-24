import catchAsync from "../../app/utils/catchAsync";
import sendResponse from "../../app/utils/sendResponse";
import sendRespone from "../../app/utils/sendResponse";
import { systemBalanceService } from "./systembalance.service";
import httpStatus from 'http-status';


const getSystemBalance = catchAsync(async (req, res) => {
    const systemBalance = await systemBalanceService.getSystemBalance();
    sendRespone(res, {
        success: true,
        message: "System Balance Get Successfully",
        data: systemBalance,
        statusCode: httpStatus.OK,
      }
  
      )

})

const updateSystemBalance = catchAsync(async (req, res) => {
    const payload = req.body;
    const {id} = req.params;
    const systemBalance = await systemBalanceService.updateSystemBalance(id,payload);
    sendResponse(res, {
        success: true,
        message: "System Balance Update Successfully",
        data: systemBalance,
        statusCode: httpStatus.OK,
      })
});

const deleteSystemBalance = catchAsync(async (req, res) => {
    const {id} = req.params;
    await systemBalanceService.deleteSystemBalance(id);
    sendResponse(res, {
        success: true,
        message: "System Balance delete Successfully",
        data: '',
        statusCode: httpStatus.OK,
      })
})


export const systemBalanceController = {
    getSystemBalance,
    updateSystemBalance,
    deleteSystemBalance,
}