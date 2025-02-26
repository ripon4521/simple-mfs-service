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
exports.balanceRequestService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const user_model_1 = __importDefault(require("../user/user.model"));
const balanceRequest_model_1 = __importDefault(require("./balanceRequest.model"));
const systemBalance_model_1 = __importDefault(require("../systemBalance/systemBalance.model"));
const createBalanceRequest = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield balanceRequest_model_1.default.create(payload);
    return result;
});
const getBalanceRequest = () => __awaiter(void 0, void 0, void 0, function* () {
    const balanceRequests = yield balanceRequest_model_1.default.find().populate('agentId');
    return balanceRequests;
});
const getBalanceRequestById = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const balanceRequests = yield balanceRequest_model_1.default.findOne({ _id }).populate('agentId');
    return balanceRequests;
});
const updateBalanceRequest = (_id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const updatedBalanceRequest = yield balanceRequest_model_1.default.findOneAndUpdate({ _id }, payload, { new: true, session } // Pass session for the transaction
        );
        if (!updatedBalanceRequest) {
            throw new Error('Balance request not found');
        }
        if (updatedBalanceRequest.status === 'approved') {
            const agent = yield user_model_1.default.findById(updatedBalanceRequest.agentId).session(session);
            if (!agent) {
                throw new Error('Agent not found');
            }
            agent.balance += updatedBalanceRequest.amount;
            yield agent.save();
            // Update system balance
            const systemBalance = yield systemBalance_model_1.default.findOne(); // assuming SystemBalanceModel exists
            if (!systemBalance) {
                throw new Error('System balance not found');
            }
            systemBalance.totalBalance -= updatedBalanceRequest.amount; // deduct from system balance
            yield systemBalance.save();
        }
        yield session.commitTransaction();
        return updatedBalanceRequest;
    }
    catch (error) {
        yield session.abortTransaction();
        throw error;
    }
    finally {
        session.endSession();
    }
});
const deleteBalanceRequest = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const deleteBalanceRequest = yield balanceRequest_model_1.default.findOneAndDelete({ _id });
    return deleteBalanceRequest;
});
exports.balanceRequestService = {
    createBalanceRequest,
    getBalanceRequest,
    updateBalanceRequest,
    deleteBalanceRequest,
    getBalanceRequestById,
};
