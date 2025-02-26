"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transctionService = void 0;
const transction_model_1 = __importDefault(require("./transction.model"));
const user_model_1 = __importDefault(require("../user/user.model")); // Assuming you have a User model
const uuid_1 = require("uuid");
const systemBalance_model_1 = __importDefault(require("../systemBalance/systemBalance.model"));
const ADMIN_MOBILE = '01788829796'; // Example admin mobile number
const createTransction = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { senderId, receiverNumber, amount } = payload;
    // Generate a unique transactionId
    const transactionId = (0, uuid_1.v4)();
    // Validate the sender and receiver
    const sender = yield user_model_1.default.findById(senderId);
    if (!sender)
        throw new Error('Sender not found.');
    const receiver = yield user_model_1.default.findOne({ mobile: receiverNumber });
    if (!receiver)
        throw new Error('Receiver not found.');
    // Calculate fee (5 Taka for amounts over 100 Taka)
    const fee = amount > 100 ? 5 : 0;
    const totalDeduct = amount + fee;
    // Check if the sender has sufficient balance
    if (sender.balance < totalDeduct) {
        throw new Error('Insufficient balance.');
    }
    // Start transaction session
    const session = yield user_model_1.default.startSession();
    session.startTransaction();
    try {
        // Deduct from sender's balance
        sender.balance -= totalDeduct;
        yield sender.save({ session });
        // Add amount to receiver's balance
        receiver.balance += amount;
        yield receiver.save({ session });
        // Add fee to admin's account (identified by admin's mobile number)
        const admin = yield user_model_1.default.findOne({ mobile: ADMIN_MOBILE }).session(session);
        if (admin) {
            admin.balance += fee;
            yield admin.save({ session });
        }
        // Update system's total balance by adding the transaction amount
        const systemBalance = yield systemBalance_model_1.default.findOne();
        if (systemBalance) {
            systemBalance.totalBalance += amount + fee; // Add amount and fee to the total system balance
            yield systemBalance.save({ session });
        }
        else {
            // If no system balance record exists, create one
            yield systemBalance_model_1.default.create({ totalBalance: amount + fee }, { session });
        }
        // Create transaction record
        const transactionData = Object.assign(Object.assign({}, payload), { transactionId,
            fee });
        const newTransaction = yield transction_model_1.default.create([transactionData], { session });
        // Commit the transaction
        yield session.commitTransaction();
        session.endSession();
        // Send confirmation or perform other actions her
        return newTransaction[0]; // Return the transaction details
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        throw new Error('Transaction failed: ' + error.message);
    }
});
const deleteTransaction = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const transaction = yield transction_model_1.default.findOneAndDelete({ _id });
    return transaction;
});
const getTransactions = () => __awaiter(void 0, void 0, void 0, function* () {
    const transactions = yield transction_model_1.default.find()
        .sort({ createdAt: -1 })
        .limit(100)
        .populate('senderId', 'name mobile')
        .populate('receiver', 'name mobile');
    return transactions;
});
exports.transctionService = {
    createTransction,
    deleteTransaction,
    getTransactions,
};
