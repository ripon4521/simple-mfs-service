import { Response } from "express";


const sendResponse   =<T> (
    res: Response,
  data : {
    success: boolean,
    message: string,
    data: T,
    statusCode: number,
  }
) => {
    res.status(data?.statusCode).json({
      
        succcess: data?.success,
        message: data?.message,
        data: data?.data,
        statusCode : data?.statusCode
    })

}

export default sendResponse;