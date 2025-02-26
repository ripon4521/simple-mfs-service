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
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_model_1 = __importDefault(require("../user/user.model"));
const systemBalance_model_1 = __importDefault(require("../systemBalance/systemBalance.model"));
const transction_model_1 = __importDefault(require("../transction/transction.model"));
const createCashIn = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { senderId, receiverNumber, amount, pin, fee } = payload;
    const transactionId = (0, uuid_1.v4)();
    const user = yield user_model_1.default.findById(senderId).select('+pin');
    if (!user)
        throw new Error('Sender not found.');
    if (!user.pin) {
        throw new Error('No PIN set for this user.');
    }
    const isPinMatched = yield bcrypt_1.default.compare(pin, user.pin);
    if (!isPinMatched)
        throw new Error('Invalid PIN.');
    // Start transaction session
    const session = yield user_model_1.default.startSession();
    try {
        session.startTransaction();
        const agent = yield user_model_1.default.findOne({
            mobile: receiverNumber,
            accountType: 'user',
        }).session(session);
        if (!agent) {
            throw new Error('User not found or unauthorized.');
        }
        // Update agent balance
        agent.balance += amount;
        yield agent.save({ session });
        // Update system balance
        const systemBalance = yield systemBalance_model_1.default.findOne().session(session);
        if (systemBalance) {
            systemBalance.totalBalance += amount;
            yield systemBalance.save({ session });
        }
        else {
            // Handle case where no system balance exists
            throw new Error('System balance not found.');
        }
        // Create transaction record
        const transactionData = Object.assign(Object.assign({}, payload), { transactionId, fee });
        yield transction_model_1.default.create([transactionData], { session });
        // Update sender's balance
        user.balance += amount;
        yield user.save({ session });
        // Commit transaction
        yield session.commitTransaction();
        return transactionData;
    }
    catch (error) {
        yield session.abortTransaction();
        throw new Error('Cash-in failed: ' + error.message);
    }
    finally {
        session.endSession();
    }
});
exports.default = createCashIn;
