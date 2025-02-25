import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import { ICashIn } from './cashIn.interface';
import UserModel from '../user/user.model';
import SystemBalance from '../systemBalance/systemBalance.model';
import transactionModel from '../transction/transction.model';

const createCashIn = async (payload: ICashIn) => {
    const { senderId, receiverNumber, amount, pin, fee } = payload;

    const transactionId = uuidv4();

    // Fetch user (sender) with PIN
    const user = await UserModel.findById(senderId).select('+pin');
    if (!user) throw new Error('Sender not found.')
    if (!user.pin) {
        throw new Error('No PIN set for this user.');
    }

    // Compare PIN
    const isPinMatched = await bcrypt.compare(pin, user.pin);
    if (!isPinMatched) throw new Error('Invalid PIN.');

    // Start transaction session
    const session = await UserModel.startSession();
    try {
        session.startTransaction();

        // Find the agent by receiverNumber (Phone number or other identifier)
        const agent = await UserModel.findOne({ mobile: receiverNumber, accountType: 'user' }).session(session);
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
        }

        // Record transaction
        const transactionData = { ...payload, transactionId, fee };
        await transactionModel.create([transactionData], { session });

        // Update user balance
        user.balance += amount;
        await user.save({ session });

        // Commit the transaction after all updates
        await session.commitTransaction();
        console.log(`Cash-in successful: ${amount} Taka deposited. Transaction ID: ${transactionId}`);

        // Notify the user (mock notification for now)
        console.log(`User notification: Cash-in transaction completed. Amount: ${amount} Taka. Transaction ID: ${transactionId}`);

        return transactionData;

    } catch (error) {
        await session.abortTransaction();
        console.error('Error during cash-in process:', error);
        throw new Error('Cash-in failed: ' + error.message);

    } finally {
        session.endSession();
    }
};

export default createCashIn;
