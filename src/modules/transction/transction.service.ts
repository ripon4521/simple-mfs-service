import { Transaction } from "./transction.interface";
import transactionModel from "./transction.model";
import UserModel from "../user/user.model"; // Assuming you have a User model
import { v4 as uuidv4 } from "uuid";
import SystemBalance from "../systemBalance/systemBalance.model";
import { Types } from "mongoose";

const ADMIN_MOBILE = '01788829796'; // Example admin mobile number

const createTransction = async (payload: Transaction) => {
    const { senderId, receiverNumber, amount } = payload;
  
    // Generate a unique transactionId
    const transactionId = uuidv4();
  
    // Validate the sender and receiver
    const sender = await UserModel.findById(senderId);
    if (!sender) throw new Error('Sender not found.');
  
    const receiver = await UserModel.findOne({ mobile: receiverNumber });
    if (!receiver) throw new Error('Receiver not found.');
  
    // Calculate fee (5 Taka for amounts over 100 Taka)
    const fee = amount > 100 ? 5 : 0;
    const totalDeduct = amount + fee;
  
    // Check if the sender has sufficient balance
    if (sender.balance < totalDeduct) {
      throw new Error('Insufficient balance.');
    }
  
    // Start transaction session
    const session = await UserModel.startSession();
    session.startTransaction();
  
    try {
      // Deduct from sender's balance
      sender.balance -= totalDeduct;
      await sender.save({ session });
  
      // Add amount to receiver's balance
      receiver.balance += amount;
      await receiver.save({ session });
  
      // Add fee to admin's account (identified by admin's mobile number)
      const admin = await UserModel.findOne({ mobile: ADMIN_MOBILE }).session(session);
      if (admin) {
        admin.balance += fee;
        await admin.save({ session });
      }
  
      // Update system's total balance by adding the transaction amount
      const systemBalance = await SystemBalance.findOne();
      if (systemBalance) {
        systemBalance.totalBalance += amount + fee; // Add amount and fee to the total system balance
        await systemBalance.save({ session });
      } else {
        // If no system balance record exists, create one
        await SystemBalance.create({ totalBalance: amount + fee }, { session });
      }
  
      // Create transaction record
      const transactionData = {
        ...payload,
        transactionId,
        fee,
      };
  
      const newTransaction = await transactionModel.create([transactionData], { session });
  
      // Commit the transaction
      await session.commitTransaction();
      session.endSession();
  
      // Send confirmation or perform other actions here
      console.log(`Transaction Successful: Sent ${amount} Taka to ${receiverNumber}. Fee: ${fee} Taka.`);
  
      return newTransaction[0]; // Return the transaction details
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw new Error('Transaction failed: ' + error.message);
    }
  };



const deleteTransaction = async (_id : string) => {
    const transaction = await transactionModel.findOneAndDelete({_id});
    return transaction;
};



const getTransactions = async () => {
   
    const transactions = await transactionModel.find()
      .sort({ createdAt: -1 })
      .limit(100)
      .populate('senderId', 'name mobile')
      .populate('receiver', 'name mobile');
  
    return transactions;
  };




export const transctionService = {
  createTransction,
  deleteTransaction,
  getTransactions,
};
