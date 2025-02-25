import { v4 as uuidv4 } from 'uuid';
import { ICashOut } from './cashOut.interface';
import UserModel from '../user/user.model';
import SystemBalance from '../systemBalance/systemBalance.model';
import transactionModel from '../transction/transction.model';
import bcrypt from 'bcrypt';

const createCashOut = async (payload: ICashOut) => {
    const { senderId, receiverNumber, amount, pin } = payload;
  
    const transactionId = uuidv4();
  
    // Fetch user with PIN
    const user = await UserModel.findById(senderId).select('+pin');
    if (!user) throw new Error('Sender not found.');
  
    console.log(`Fetched user PIN: ${user.pin ? 'Exists' : 'Not Found'}`);
    console.log(`Entered PIN: ${pin}`);
  
    // Check if user PIN exists
    if (!user.pin) {
      throw new Error('No PIN set for this user.');
    }
  
    // Compare PIN
    const isPinMatched = await bcrypt.compare(pin, user.pin);
    if (!isPinMatched) throw new Error('Invalid PIN.');
  
    // Calculate transaction fee
    const fee = amount * 0.015;
    const totalDeductedAmount = amount + fee;
  
    if (user.balance < totalDeductedAmount) {
      throw new Error('Insufficient balance.');
    }
  
    // Start transaction session
    const session = await UserModel.startSession();
    try {
      session.startTransaction();
  
      // Deduct from sender
      user.balance -= totalDeductedAmount;
      await user.save({ session });
  
      // Find agent
      const agent = await UserModel.findOne({ mobile: receiverNumber, accountType: 'agent', isApproved: true }).session(session);
      if (!agent) throw new Error('Agent not found or unauthorized.');
  
      // Update agent balance
      const agentIncome = amount * 0.01;
      agent.balance += amount;
      agent.income = (agent.income || 0) + agentIncome;
      await agent.save({ session });
  
      // Update admin balance
      const admin = await UserModel.findOne({ accountType: 'admin' }).session(session);
      if (admin) {
        const adminIncome = amount * 0.005;
        admin.balance += adminIncome;
        await admin.save({ session });
      }
  
      // Update system balance
      const systemBalance = await SystemBalance.findOne().session(session);
      if (systemBalance) {
        systemBalance.totalBalance -= amount;
        await systemBalance.save({ session });
      }
  
      // Record transaction
      const transactionData = { ...payload, transactionId, fee };
      await transactionModel.create([transactionData], { session });
  
      await session.commitTransaction();
      console.log(`Cash-out successful: ${amount} Taka withdrawn, Fee: ${fee} Taka, Transaction ID: ${transactionId}`);
      return transactionData;
  
    } catch (error) {
      await session.abortTransaction();
      console.error('Error during cash-out process:', error);
      throw new Error('Cash-out failed: ' + error.message);
  
    } finally {
      session.endSession();
    }
  };
  
export default createCashOut;
