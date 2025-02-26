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
const uuid_1 = require("uuid");
const user_model_1 = __importDefault(require("../user/user.model"));
const systemBalance_model_1 = __importDefault(require("../systemBalance/systemBalance.model"));
const transction_model_1 = __importDefault(require("../transction/transction.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const createCashOut = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { senderId, receiverNumber, amount, pin } = payload;
    const transactionId = (0, uuid_1.v4)();
    const user = yield user_model_1.default.findById(senderId).select('+pin');
    if (!user)
        throw new Error('Sender not found.');
    if (!user.pin) {
        throw new Error('No PIN set for this user.');
    }
    // Compare PIN
    const isPinMatched = yield bcrypt_1.default.compare(pin, user.pin);
    if (!isPinMatched)
        throw new Error('Invalid PIN.');
    // Calculate transaction fee
    const fee = amount * 0.015;
    const totalDeductedAmount = amount + fee;
    if (user.balance < totalDeductedAmount) {
        throw new Error('Insufficient balance.');
    }
    // Start transaction session
    const session = yield user_model_1.default.startSession();
    try {
        session.startTransaction();
        // Deduct from sender
        user.balance -= totalDeductedAmount;
        yield user.save({ session });
        // Find agent
        const agent = yield user_model_1.default.findOne({
            mobile: receiverNumber,
            accountType: 'agent',
            isApproved: true,
        }).session(session);
        if (!agent)
            throw new Error('Agent not found or unauthorized.');
        // Update agent balance
        const agentIncome = amount * 0.01;
        agent.balance += amount;
        agent.balance = (agent.balance || 0) + agentIncome;
        yield agent.save({ session });
        // Update admin balance
        const admin = yield user_model_1.default.findOne({ accountType: 'admin' }).session(session);
        if (admin) {
            const adminIncome = amount * 0.005;
            admin.balance += adminIncome;
            yield admin.save({ session });
        }
        // Update system balance
        const systemBalance = yield systemBalance_model_1.default.findOne().session(session);
        if (systemBalance) {
            systemBalance.totalBalance -= amount;
            yield systemBalance.save({ session });
        }
        // Record transaction
        const transactionData = Object.assign(Object.assign({}, payload), { transactionId, fee });
        yield transction_model_1.default.create([transactionData], { session });
        yield session.commitTransaction();
        return transactionData;
    }
    catch (error) {
        yield session.abortTransaction();
        throw new Error('Cash-out failed: ' + error.message);
    }
    finally {
        session.endSession();
    }
});
exports.default = createCashOut;
