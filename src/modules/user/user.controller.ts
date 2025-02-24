import catchAsync from "../../app/utils/catchAsync"
import sendRespone from "../../app/utils/sendResponse"
import httpStatus from 'http-status';
import { userServies } from "./user.service";



const createUser = catchAsync(
    async (req, res) => {
      const payload = req.body;
  
      const result = await userServies.createUser(payload)
  
      sendRespone(res, {
        success: true,
        message: "User created successfully",
        data: result,
        statusCode: httpStatus.CREATED,
      }
  
      )
    })


  export  const userController = {
        createUser,
    }