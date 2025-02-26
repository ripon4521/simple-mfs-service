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
exports.authService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const systemBalance_model_1 = __importDefault(require("../systemBalance/systemBalance.model"));
const user_model_1 = __importDefault(require("../user/user.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const register = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        // 1. Create the new user
        const result = yield user_model_1.default.create([payload], { session });
        if (!result)
            throw { message: 'Failed to create user', statusCode: 500 };
        const systemBalance = yield systemBalance_model_1.default.findOne({}, null, { session });
        if (!systemBalance) {
            yield systemBalance_model_1.default.create({ totalBalance: 0 }, { session });
        }
        let amountToAdd = 0;
        if (payload.accountType === 'user') {
            amountToAdd = 40;
        }
        else if (payload.accountType === 'agent') {
            amountToAdd = 100000;
        }
        const updatedBalance = systemBalance.totalBalance + amountToAdd;
        yield systemBalance_model_1.default.updateOne({}, { totalBalance: updatedBalance }, { session });
        yield session.commitTransaction();
        session.endSession();
        return result;
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        // console.error("Error during transaction:", error);
        throw new Error('Failed to create user and update system balance');
    }
});
const login = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (!payload.mobile || !payload.pin) {
        throw { message: 'Mobile and PIN are required', statusCode: 400 };
    }
    const user = yield user_model_1.default.findOne({ mobile: payload.mobile }).select('+pin');
    if (!user) {
        throw { message: 'User not found!', statusCode: 404, field: 'mobile' };
    }
    if (user.isBlocked) {
        throw { message: 'This user is blocked!', statusCode: 403 };
    }
    const isPinMatched = yield bcrypt_1.default.compare(payload.pin, user.pin);
    if (!isPinMatched) {
        throw { message: 'Invalid PIN', statusCode: 401, field: 'pin' };
    }
    const jwtPayload = {
        mobile: user.mobile,
        role: user.accountType,
        id: user._id.toString(),
        pin: user.pin,
    };
    const token = jsonwebtoken_1.default.sign(jwtPayload, process.env.JWT_SECRET || 'primarytestkey', { expiresIn: '10d' });
    return { token, user };
});
exports.authService = {
    register,
    login,
};
