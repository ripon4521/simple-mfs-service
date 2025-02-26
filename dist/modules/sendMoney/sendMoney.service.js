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
exports.sendMoneyService = void 0;
const systemBalance_model_1 = __importDefault(require("../systemBalance/systemBalance.model"));
const transction_model_1 = __importDefault(require("../transction/transction.model"));
const user_model_1 = __importDefault(require("../user/user.model"));
const uuid_1 = require("uuid");
const ADMIN_MOBILE = '01788829796';
const createSendmoney = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { senderId, receiverNumber, amount } = payload;
    const transactionId = (0, uuid_1.v4)();
    const sender = yield user_model_1.default.findById(senderId);
    if (!sender)
        throw new Error('Sender not found.');
    const receiver = yield user_model_1.default.findOne({ mobile: receiverNumber });
    if (!receiver)
        throw new Error('Receiver not found.');
    const fee = amount > 100 ? 5 : 0;
    const totalDeduct = amount + fee;
    if (sender.balance < totalDeduct) {
        throw new Error('Insufficient balance.');
    }
    // Start transaction session
    const session = yield user_model_1.default.startSession();
    session.startTransaction();
    try {
        sender.balance -= totalDeduct;
        yield sender.save({ session });
        receiver.balance += amount;
        yield receiver.save({ session });
        const admin = yield user_model_1.default.findOne({ mobile: ADMIN_MOBILE }).session(session);
        if (admin) {
            admin.balance += fee;
            yield admin.save({ session });
        }
        const systemBalance = yield systemBalance_model_1.default.findOne();
        if (systemBalance) {
            systemBalance.totalBalance += amount + fee; // Add amount and fee to the total system balance
            yield systemBalance.save({ session });
        }
        else {
            yield systemBalance_model_1.default.create({ totalBalance: amount + fee }, { session });
        }
        const transactionData = Object.assign(Object.assign({}, payload), { transactionId,
            fee });
        const newTransaction = yield transction_model_1.default.create([transactionData], {
            session,
        });
        yield session.commitTransaction();
        session.endSession();
        return newTransaction[0];
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        throw new Error('Transaction failed: ' + error.message);
    }
});
exports.sendMoneyService = {
    createSendmoney,
};
