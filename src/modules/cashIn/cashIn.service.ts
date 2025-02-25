import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import { ICashIn } from './cashIn.interface';
import UserModel from '../user/user.model';
import SystemBalance from '../systemBalance/systemBalance.model';
import transactionModel from '../transction/transction.model';

const createCashIn = async (payload: ICashIn) => {
    const { senderId, receiverNumber, amount, pin, fee } = payload;
  
    const transactionId = uuidv4();
  
    const user = await UserModel.findById(senderId).select('+pin');
    if (!user) throw new Error('Sender not found.');
    if (!user.pin) {
      throw new Error('No PIN set for this user.');
    }
  
    const isPinMatched = await bcrypt.compare(pin, user.pin);
    if (!isPinMatched) throw new Error('Invalid PIN.');
  
    // Start transaction session
    const session = await UserModel.startSession();
    try {
      session.startTransaction();
  
      const agent = await UserModel.findOne({
        mobile: receiverNumber,
        accountType: 'user',
      }).session(session);
      if (!agent) {
        throw new Error('User not found or unauthorized.');
      }
  
      // Update agent balance
      agent.balance += amount;
      await agent.save({ session });
  
      // Update system balance
      const systemBalance = await SystemBalance.findOne().session(session);
      if (systemBalance) {
        systemBalance.totalBalance += amount;
        await systemBalance.save({ session });
      } else {
        // Handle case where no system balance exists
        throw new Error('System balance not found.');
      }
  
      // Create transaction record
      const transactionData = { ...payload, transactionId, fee };
      await transactionModel.create([transactionData], { session });
  
      // Update sender's balance
      user.balance += amount;
      await user.save({ session });
  
      // Commit transaction
      await session.commitTransaction();
  
      return transactionData;
    } catch (error) {
      await session.abortTransaction();
  
      throw new Error('Cash-in failed: ' + error.message);
    } finally {
      session.endSession();
    }
  };
  

export default createCashIn;
