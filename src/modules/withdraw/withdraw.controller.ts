import catchAsync from "../../app/utils/catchAsync";
import sendResponse from "../../app/utils/sendResponse";
import httpStatus from 'http-status';
import { withdrawService } from "./withdraw.service";


const cerateWithdraw = catchAsync(async(req, res) => {
    const payload = req.body;
    const result = await withdrawService.createWithdraw(payload);
    sendResponse(res, {
        success: true,
        message: "ithdraw Request  successful",
        data: result,
        statusCode: httpStatus.CREATED,
    });
});

const getAllWithdraw = catchAsync(async(req, res) => {
    const result = await withdrawService.getAllWithdraw();
    sendResponse(res, {
        success: true,
        message: "All Withdraw Requests fetched successfully",
        data: result,
        statusCode: httpStatus.OK,
    });
});

const deleteWWithdraw = catchAsync(async(req, res) => {
    const { id } = req.params;
    const result = await withdrawService.deleteWithdraw(id);
    sendResponse(res, {
        success: true,
        message: "Withdraw Request Deleted successfully",
        data: result,
        statusCode: httpStatus.OK,
    });
})


const updateWithdraw = catchAsync(async(req, res) => {
    const { id } = req.params;
    const payload = req.body;
    const result = await withdrawService.updateWithdraw(id, payload);
    sendResponse(res, {
        success: true,
        message: "Withdraw Request updated successfully",
        data: result,
        statusCode: httpStatus.OK,
    });
})

const getSingleWithdraw = catchAsync(async(req, res) => {
    const { id } = req.params;
    const result = await withdrawService.getWithdrawById(id);
    sendResponse(res, {
        success: true,
        message: "Wiothdraw Request fetched successfully",
        data: result,
        statusCode: httpStatus.OK,
    });
})


export const withdrawController = {
    cerateWithdraw,
    getAllWithdraw,
    deleteWWithdraw,
    updateWithdraw,
    getSingleWithdraw,
  


 
}