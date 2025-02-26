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
exports.withdrawService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const user_model_1 = __importDefault(require("../user/user.model"));
const withdraw_model_1 = __importDefault(require("./withdraw.model"));
const agentNotification_model_1 = require("../agentNotification/agentNotification.model");
const systemBalance_model_1 = __importDefault(require("../systemBalance/systemBalance.model"));
const createWithdraw = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const agent = yield user_model_1.default.findById(payload.agentId).session(session);
        if (!agent) {
            throw new Error('Agent not found');
        }
        if (agent.balance < payload.amount) {
            throw new Error('Insufficient balance to process the withdrawal');
        }
        const result = yield withdraw_model_1.default.create([payload], { session });
        agent.balance -= payload.amount;
        yield agent.save({ session });
        yield session.commitTransaction();
        return result;
    }
    catch (error) {
        yield session.abortTransaction();
        throw error;
    }
    finally {
        session.endSession();
    }
});
const getAllWithdraw = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield withdraw_model_1.default.find().populate('agentId');
    return result;
});
const getWithdrawById = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield withdraw_model_1.default.findOne({ _id }).populate('agentId');
    return result;
});
const updateWithdraw = (_id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const updatedWithdrawRequest = yield withdraw_model_1.default.findOneAndUpdate({ _id }, payload, { new: true, session });
        if (!updatedWithdrawRequest) {
            throw new Error('Balance request not found');
        }
        if (updatedWithdrawRequest.status === 'approved') {
            const agent = yield user_model_1.default.findById(updatedWithdrawRequest.agentId).session(session);
            if (!agent) {
                throw new Error('Agent not found');
            }
            // Create notification
            const notificationData = {
                agentId: updatedWithdrawRequest.agentId,
                message: `Your withdrawal of ৳${updatedWithdrawRequest.amount} has been approved.`,
                type: 'withdrawal',
                status: 'unread',
            };
            yield agentNotification_model_1.NotificationModel.create([notificationData], { session });
            // Update system balance
            const systemBalance = yield systemBalance_model_1.default.findOne().session(session);
            if (!systemBalance) {
                throw new Error('System balance not found');
            }
            systemBalance.totalBalance -= updatedWithdrawRequest.amount;
            yield systemBalance.save({ session });
        }
        if (updatedWithdrawRequest.status === 'rejected') {
            const agent = yield user_model_1.default.findById(updatedWithdrawRequest.agentId).session(session);
            if (!agent) {
                throw new Error('Agent not found');
            }
            // Revert agent balance if rejected
            agent.balance += updatedWithdrawRequest.amount;
            yield agent.save({ session });
        }
        yield session.commitTransaction();
        return updatedWithdrawRequest;
    }
    catch (error) {
        yield session.abortTransaction();
        throw error;
    }
    finally {
        session.endSession();
    }
});
const deleteWithdraw = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const deleteBalanceRequest = yield withdraw_model_1.default.findOneAndDelete({ _id });
    return deleteBalanceRequest;
});
exports.withdrawService = {
    createWithdraw,
    getAllWithdraw,
    getWithdrawById,
    updateWithdraw,
    deleteWithdraw
};
