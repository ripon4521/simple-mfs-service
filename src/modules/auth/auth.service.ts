import { IUser } from "../user/user.interface";
import UserModel from "../user/user.model";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';



const register = async (payload: IUser) => {
    const result = await UserModel.create(payload);
    if (!result) throw { message: 'Failed to create user', statusCode: 500 };
    return result;
  };


const login = async (payload: { mobile: string; pin: string }) => {
  // Validate input
  if (!payload.mobile || !payload.pin) {
    throw { message: 'Mobile and PIN are required', statusCode: 400 };
  }

  // Find user by mobile number and select the pin field
  const user = await UserModel.findOne({ mobile: payload.mobile }).select('+pin');

  if (!user) {
    throw { message: 'User not found!', statusCode: 404, field: 'mobile' };
  }

  if (user.isBlocked) {
    throw { message: 'This user is blocked!', statusCode: 403 };
  }

  // Check if the pin matches
  const isPinMatched = await bcrypt.compare(payload.pin, user.pin);

  if (!isPinMatched) {
    throw { message: 'Invalid PIN', statusCode: 401, field: 'pin' };
  }

  // JWT Payload
  const jwtPayload = { mobile: user.mobile, role: user.accountType, id: user._id.toString() };

  // Generate JWT token
  const token = jwt.sign(jwtPayload, process.env.JWT_SECRET || "primarytestkey", { expiresIn: '10d' });

  return { token, user };
};



  
  export const authService = {
    register,
    login
  }