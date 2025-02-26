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
exports.userServies = void 0;
const user_model_1 = __importDefault(require("./user.model"));
const createUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    //   payload.role = 'admin';
    const result = yield user_model_1.default.create(payload);
    return result;
});
const getUser = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (searchTerm = '') {
    let filter = {};
    if (searchTerm && searchTerm.trim() !== '') {
        filter = {
            mobile: { $regex: searchTerm, $options: "i" } // Case-insensitive search
        };
    }
    const result = yield user_model_1.default.find(filter); // Fetch users with filter
    return result;
});
const getSingleUser = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.default.findOne({ _id });
    return result;
});
const getPofile = (mobile) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mobile)
        throw new Error('mobile is required to fetch profile.');
    const result = yield user_model_1.default.findOne({ mobile });
    if (!result)
        throw new Error('User not found.');
    return result;
});
const updateUser = (_id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (!_id)
        throw new Error('User ID is required to update user.');
    const result = yield user_model_1.default.findOneAndUpdate({ _id }, payload, { new: true });
    return result;
});
const deleteUser = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    if (!_id)
        throw new Error('User ID is required to delete user.');
    const result = yield user_model_1.default.findOneAndDelete({ _id });
    return result;
});
exports.userServies = {
    createUser,
    getPofile,
    getUser,
    updateUser,
    deleteUser,
    getSingleUser
};
