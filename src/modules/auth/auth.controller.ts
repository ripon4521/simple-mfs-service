import { Request, Response } from "express";
import catchAsync from "../../app/utils/catchAsync";
import { authService } from "./auth.service";

import httpStatus from 'http-status';
import sendResponse from "../../app/utils/sendResponse";


const register = catchAsync(async(req: Request, res: Response)=>{
    const result = await authService.register(req.body);
    sendResponse(res, {
        success: true,
        message: "User created successfully",
        data: result,
        statusCode: httpStatus.CREATED,
      }
  
      )
   
})

const login = catchAsync(async(req: Request, res: Response)=>{
    const result = await authService.login(req.body);


    sendResponse(res, {
        success: true,
        message: "User Login successfully",
        data: result,
        statusCode: httpStatus.CREATED,
      })
})



export const authController  = {
    register,
    login,

}
