import catchAsync from "../../app/utils/catchAsync";
import sendResponse from "../../app/utils/sendResponse";
import { notificationService } from "./agentNotification.service";
import httpStatus from 'http-status';


const getAllNotification = catchAsync(async(req, res) => {
    const result = await notificationService.getNotification();
    sendResponse(res, {
        success: true,
        message: "All Notification fetched successfully",
        data: result,
        statusCode: httpStatus.OK,
    });
})

export const notifcationControllr = {
    getAllNotification,
 
}