
import catchAsync from "../../app/utils/catchAsync";
import sendResponse from "../../app/utils/sendResponse";
import createCashOut from "./cashOut.service";
import httpStatus from 'http-status';

const createCashoutController = catchAsync(async (req, res) => {
    const payload = req.body;
    
    // Pass the payload and pin to the service
    const result = await createCashOut(payload);

    sendResponse(res, {
        success: true,
        message: "Cash Out successful",
        data: result,
        statusCode: httpStatus.CREATED,
    });
});

export default createCashoutController;
