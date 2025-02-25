import catchAsync from "../../app/utils/catchAsync"
import httpStatus from 'http-status';
import { userServies } from "./user.service";
import sendResponse from "../../app/utils/sendResponse";



const createUser = catchAsync(
    async (req, res) => {
      const payload = req.body;
  
      const result = await userServies.createUser(payload)
  
      sendResponse(res, {
        success: true,
        message: "User created successfully",
        data: result,
        statusCode: httpStatus.CREATED,
      }
  
      )
    })

    const updateUser = catchAsync(async (req, res) => {
        const payload = req.body;
        const { id } = req.params;
        
        const result = await userServies.updateUser(id, payload);
        sendResponse(res, {
          success: true,
          message: "User updated successfully",
          data: result,
          statusCode: httpStatus.OK,
        }
    
        )


      
      
      })


      const getUser = catchAsync(async (req, res) => {

        const searchTerm = typeof req.query.searchTerm === 'string' ? req.query.searchTerm : '';
        const result = await userServies.getUser(searchTerm || '');
      
        // Send the response
        sendResponse(res, {
          success: true,
          message: 'User GET successfully',
          data: result,
          statusCode: httpStatus.OK, 
        });
      });
      



      const getProfile = catchAsync(async (req, res) => {
        const data = req.user;
        // console.log(data);
    
        const result = await userServies.getPofile(data?.mobile); // Assuming userServices.getProfile is defined
        sendResponse(res, {
            success: true,
            message: 'User fetched successfully',
            data: result,
            statusCode: httpStatus.OK,
        });
    });


    const deleteUser = catchAsync(async (req, res) => {
        const { id } = req.params;
        const result = await userServies.deleteUser(id);
        sendResponse(res, {
          success: true,
          message: "User deleted successfully",
          data: result,
          statusCode: httpStatus.OK,
        })
    
    })


    const getSingleUser = catchAsync(async (req, res) => {
      const { id } = req.params;
      const result = await userServies.getSingleUser(id);
      sendResponse(res, {
        success: true,
        message: "User fetched successfully",
        data: result,
        statusCode: httpStatus.OK,
      })
    })

export const userController = {
        createUser,
        getUser,
        getProfile,
        updateUser,
        deleteUser,
        getSingleUser,
}