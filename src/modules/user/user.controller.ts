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



    const getUser = catchAsync(async (req, res,) => {
        console.log(req.user?.accountType)
          // Call the service to get the user data
          const result = await userServies.getUser(req.user?.accountType); 
          console.log(result)// Pass accountType if necessary
      
          // Send the response
          sendRespone(res, {
            success: true,
            message: 'User GET successfully',
            data: result,
            statusCode: httpStatus.OK, // Use OK (200) for successful GET requests
          });
        
      });




      const getProfile = catchAsync(async (req, res) => {
        const data = req.user;
        // console.log(data);
    
        const result = await userServies.getPofile(data?.mobile); // Assuming userServices.getProfile is defined
        sendRespone(res, {
            success: true,
            message: 'User fetched successfully',
            data: result,
            statusCode: httpStatus.OK,
        });
    });


export  const userController = {
        createUser,
        getUser,
        getProfile,
    }