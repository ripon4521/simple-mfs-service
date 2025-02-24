import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import catchAsync from '../utils/catchAsync';
import { TUserRole } from '../../modules/user/user.interface';
import UserModel from '../../modules/user/user.model';


// Extend Request type to include user
interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}

const auth = (...requiredRoles: TUserRole[]) => {
    return catchAsync(async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
      const authHeader = req.headers.authorization;
  
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new Error('You are not authorized!');
      }
  
      const token = authHeader.split(' ')[1]; // Extract token after 'Bearer'
  
      const decoded = jwt.verify(token, "primarytestkey") as JwtPayload;
      const {  mobile } = decoded;
    //   console.log(accountType, mobile);
  
      const user = await UserModel.findOne({ mobile });
    //   console.log(user?.accountType);
  
      if (!user) {
        throw new Error('This user is not found!');
      }
  
      if (user.isBlocked) {
        throw new Error('This user is blocked!');
      }
  
      if (requiredRoles.length && !requiredRoles.includes(user?.accountType)) {
        throw new Error('You are not authorized!');
      }
      

      req.user =  decoded ; // Attach decoded token to req.user
      next();
    });
  };
  


  
export default auth;
