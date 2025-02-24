import { Request, Response } from "express";
import catchAsync from "../../app/utils/catchAsync";
import { authService } from "./auth.service";
import sendRespone from "../../app/utils/sendResponse";
import httpStatus from 'http-status';


const register = catchAsync(async(req: Request, res: Response)=>{
    const result = await authService.register(req.body);
    sendRespone(res, {
        success: true,
        message: "User created successfully",
        data: result,
        statusCode: httpStatus.CREATED,
      }
  
      )
   
})

const login = catchAsync(async(req: Request, res: Response)=>{
    const result = await authService.login(req.body);


    sendRespone(res, {
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
