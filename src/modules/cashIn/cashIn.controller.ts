
import catchAsync from "../../app/utils/catchAsync";
import sendResponse from "../../app/utils/sendResponse";
import createCashIn from "./cashIn.service";
import httpStatus from 'http-status';

const createCashInController = catchAsync(async (req, res) => {
    const payload = req.body;
    
    // Pass the payload and pin to the service
    const result = await createCashIn(payload);

    sendResponse(res, {
        success: true,
        message: "Cash In successful",
        data: result,
        statusCode: httpStatus.CREATED,
    });
});

export default createCashInController;
