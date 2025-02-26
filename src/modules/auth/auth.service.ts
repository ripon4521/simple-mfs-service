import mongoose from 'mongoose';
import SystemBalance from '../systemBalance/systemBalance.model';
import { IUser } from '../user/user.interface';
import UserModel from '../user/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const register = async (payload: IUser) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // 1. Create the new user
    const result = await UserModel.create([payload], { session });
    if (!result) throw { message: 'Failed to create user', statusCode: 500 };

    const systemBalance = await SystemBalance.findOne({}, null, { session });

    if (!systemBalance) {
      
      await SystemBalance.create(
        { totalBalance: 0 },
        { session },
      );
     
    }

    let amountToAdd = 0;
    if (payload.accountType === 'user') {
      amountToAdd = 40;
    } else if (payload.accountType === 'agent') {
      amountToAdd = 100000;
    }

    const updatedBalance = systemBalance.totalBalance + amountToAdd;

    await SystemBalance.updateOne(
      {},
      { totalBalance: updatedBalance },
      { session },
    );

    await session.commitTransaction();
    session.endSession();

    return result;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    // console.error("Error during transaction:", error);
    throw new Error('Failed to create user and update system balance');
  }
};

const login = async (payload: { mobile: string; pin: string }) => {
  if (!payload.mobile || !payload.pin) {
    throw { message: 'Mobile and PIN are required', statusCode: 400 };
  }

  const user = await UserModel.findOne({ mobile: payload.mobile }).select(
    '+pin',
  );

  if (!user) {
    throw { message: 'User not found!', statusCode: 404, field: 'mobile' };
  }

  if (user.isBlocked) {
    throw { message: 'This user is blocked!', statusCode: 403 };
  }

  const isPinMatched = await bcrypt.compare(payload.pin, user.pin);

  if (!isPinMatched) {
    throw { message: 'Invalid PIN', statusCode: 401, field: 'pin' };
  }

  const jwtPayload = {
    mobile: user.mobile,
    role: user.accountType,
    id: user._id.toString(),
    pin: user.pin,
  };

  const token = jwt.sign(
    jwtPayload,
    process.env.JWT_SECRET || 'primarytestkey',
    { expiresIn: '10d' },
  );

  return { token, user };
};

export const authService = {
  register,
  login,
};
