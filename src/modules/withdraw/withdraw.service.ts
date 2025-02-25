import mongoose from "mongoose";
import UserModel from "../user/user.model";
import { IWithdraw } from "./withdaw.interface";
import withdrawModel from "./withdraw.model";
import { NotificationModel } from "../agentNotification/agentNotification.model";
import SystemBalance from "../systemBalance/systemBalance.model";


const createWithdraw = async (payload: IWithdraw) => {
    const session = await mongoose.startSession();
  
    try {
      session.startTransaction();
  
      const agent = await UserModel.findById(payload.agentId).session(session);
      if (!agent) {
        throw new Error('Agent not found');
      }
  
      if (agent.balance < payload.amount) {
        throw new Error('Insufficient balance to process the withdrawal');
      }
  
      const result = await withdrawModel.create([payload], { session });
  
      agent.balance -= payload.amount;
      await agent.save({ session });
  
      await session.commitTransaction();
  
      return result;
  
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  };

const getAllWithdraw = async()=>{
    const result = await withdrawModel.find().populate('agentId');
    return result;
}

const getWithdrawById = async(_id:string)=>{
    const result = await withdrawModel.findOne({_id}).populate('agentId');
    return result;
}


const updateWithdraw = async (_id: string, payload: IWithdraw) => {
    const session = await mongoose.startSession();
    
    try {
      session.startTransaction();
      const updatedWithdrawRequest = await withdrawModel.findOneAndUpdate(
        { _id },
        payload,
        { new: true, session }
      );
  
      if (!updatedWithdrawRequest) {
        throw new Error('Balance request not found');
      }
  
      if (updatedWithdrawRequest.status === 'approved') {
        const agent = await UserModel.findById(updatedWithdrawRequest.agentId).session(session);
  
        if (!agent) {
          throw new Error('Agent not found');
        }
  
        // Create notification
        const notificationData = {
          agentId: updatedWithdrawRequest.agentId,
          message: `Your withdrawal of ৳${updatedWithdrawRequest.amount} has been approved.`,
          type: 'withdrawal', 
          status: 'unread', 
        };
  
        const notification = await NotificationModel.create([notificationData], { session });
  
  
        // Update system balance
        const systemBalance = await SystemBalance.findOne().session(session);
        if (!systemBalance) {
          throw new Error('System balance not found');
        }
  
        systemBalance.totalBalance -= updatedWithdrawRequest.amount;
        await systemBalance.save({ session });
      }
  
      if (updatedWithdrawRequest.status === 'rejected') {
        const agent = await UserModel.findById(updatedWithdrawRequest.agentId).session(session);
  
        if (!agent) {
          throw new Error('Agent not found');
        }
  
        // Revert agent balance if rejected
        agent.balance += updatedWithdrawRequest.amount;
        await agent.save({ session });
      }
  
      await session.commitTransaction();
      return updatedWithdrawRequest;
  
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  };
  
  

const deleteWithdraw = async(_id:string)=>{
  const deleteBalanceRequest=  await withdrawModel.findOneAndDelete({_id});
    return deleteBalanceRequest;
}


export const withdrawService = {
    createWithdraw,
    getAllWithdraw,
    getWithdrawById,
    updateWithdraw,
    deleteWithdraw
  
   

}