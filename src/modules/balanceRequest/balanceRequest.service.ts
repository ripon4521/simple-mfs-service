import mongoose from "mongoose";
import UserModel from "../user/user.model";
import { IBalanceRequest } from "./balanceRequest.inteface";
import balanceRequestModel from "./balanceRequest.model";


const createBalanceRequest = async(payload:IBalanceRequest)=>{
    const result = await balanceRequestModel.create(payload);
    return result;
}

const getBalanceRequest = async()=>{
    const balanceRequests = await balanceRequestModel.find().populate('agentId');
    return balanceRequests;
}

const getBalanceRequestById = async(_id:string)=>{
    const balanceRequests = await balanceRequestModel.findOne({_id});
    return balanceRequests;
}

const updateBalanceRequest = async (_id: string, payload: IBalanceRequest) => {

    const session = await mongoose.startSession();
    
    try {
      session.startTransaction();
      const updatedBalanceRequest = await balanceRequestModel.findOneAndUpdate(
        { _id },
        payload,
        { new: true, session } // Pass session for the transaction
      );
  
      if (!updatedBalanceRequest) {
        throw new Error('Balance request not found');
      }
  
      if (updatedBalanceRequest.status === 'approved') {
        const agent = await UserModel.findById(updatedBalanceRequest.agentId).session(session);
  
        if (!agent) {
          throw new Error('Agent not found');
        }
        agent.balance += updatedBalanceRequest.amount;
        await agent.save();
      }
  
      await session.commitTransaction();
      return updatedBalanceRequest;
  
    } catch (error) {
      await session.abortTransaction();
      throw error; 
    } finally {
   
      session.endSession();
    }
  };

const deleteBalanceRequest = async(_id:string)=>{
  const deleteBalanceRequest=  await balanceRequestModel.findOneAndDelete({_id});
    return deleteBalanceRequest;
}


export const balanceRequestService = {
    createBalanceRequest,
    getBalanceRequest,
    updateBalanceRequest,
    deleteBalanceRequest,
    getBalanceRequestById,

}