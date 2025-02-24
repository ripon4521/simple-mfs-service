import catchAsync from "../../app/utils/catchAsync";
import sendRespone from "../../app/utils/sendResponse";
import { transctionService } from "./transction.service";
import httpStatus from 'http-status';



const createTransctions = catchAsync(async (req, res) =>{
    const payload = req.body;
    const result = await transctionService.createTransction(payload);
    sendRespone(res, {
        success: true,
        message: "Transction created successfully",
        data: result,
        statusCode: httpStatus.CREATED,
      }
  
      )
});



const deleteTransction = catchAsync(async (req, res) =>{
    const {id} = req.params;
    const result = await transctionService.deleteTransaction(id);
    sendRespone(res, {
        success: true,
        message: "Transction deleted successfully",
        data: result,
        statusCode: httpStatus.OK,
      })
});


export const transctionController = {
    createTransctions,
    deleteTransction
 
}