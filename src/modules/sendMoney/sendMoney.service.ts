import SystemBalance from '../systemBalance/systemBalance.model';
import transactionModel from '../transction/transction.model';
import UserModel from '../user/user.model';
import { ISendMoney } from './sendMoney.interface';
import { v4 as uuidv4 } from 'uuid';
const ADMIN_MOBILE = '01788829796';

const createSendmoney = async (payload: ISendMoney) => {
  const { senderId, receiverNumber, amount } = payload;

  const transactionId = uuidv4();

  const sender = await UserModel.findById(senderId);
  if (!sender) throw new Error('Sender not found.');

  const receiver = await UserModel.findOne({ mobile: receiverNumber });
  if (!receiver) throw new Error('Receiver not found.');

  const fee = amount > 100 ? 5 : 0;
  const totalDeduct = amount + fee;

  if (sender.balance < totalDeduct) {
    throw new Error('Insufficient balance.');
  }

  // Start transaction session
  const session = await UserModel.startSession();
  session.startTransaction();

  try {
    sender.balance -= totalDeduct;
    await sender.save({ session });

    receiver.balance += amount;
    await receiver.save({ session });

    const admin = await UserModel.findOne({ mobile: ADMIN_MOBILE }).session(
      session,
    );
    if (admin) {
      admin.balance += fee;
      await admin.save({ session });
    }

    const systemBalance = await SystemBalance.findOne();
    if (systemBalance) {
      systemBalance.totalBalance += amount + fee; // Add amount and fee to the total system balance
      await systemBalance.save({ session });
    } else {
      await SystemBalance.create({ totalBalance: amount + fee }, { session });
    }

    const transactionData = {
      ...payload,
      transactionId,
      fee,
    };

    const newTransaction = await transactionModel.create([transactionData], {
      session,
    });

    await session.commitTransaction();
    session.endSession();


    return newTransaction[0];
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw new Error('Transaction failed: ' + error.message);
  }
};

export const sendMoneyService = {
  createSendmoney,
};
