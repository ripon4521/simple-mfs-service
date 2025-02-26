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
exports.userController = void 0;
const catchAsync_1 = __importDefault(require("../../app/utils/catchAsync"));
const http_status_1 = __importDefault(require("http-status"));
const user_service_1 = require("./user.service");
const sendResponse_1 = __importDefault(require("../../app/utils/sendResponse"));
const createUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const result = yield user_service_1.userServies.createUser(payload);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "User created successfully",
        data: result,
        statusCode: http_status_1.default.CREATED,
    });
}));
const updateUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const { id } = req.params;
    const result = yield user_service_1.userServies.updateUser(id, payload);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "User updated successfully",
        data: result,
        statusCode: http_status_1.default.OK,
    });
}));
const getUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const searchTerm = typeof req.query.searchTerm === 'string' ? req.query.searchTerm : '';
    const result = yield user_service_1.userServies.getUser(searchTerm || '');
    // Send the response
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'User GET successfully',
        data: result,
        statusCode: http_status_1.default.OK,
    });
}));
const getProfile = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.user;
    // console.log(data);
    const result = yield user_service_1.userServies.getPofile(data === null || data === void 0 ? void 0 : data.mobile); // Assuming userServices.getProfile is defined
    (0, sendResponse_1.default)(res, {
        success: true,
        message: 'User fetched successfully',
        data: result,
        statusCode: http_status_1.default.OK,
    });
}));
const deleteUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield user_service_1.userServies.deleteUser(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "User deleted successfully",
        data: result,
        statusCode: http_status_1.default.OK,
    });
}));
const getSingleUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield user_service_1.userServies.getSingleUser(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "User fetched successfully",
        data: result,
        statusCode: http_status_1.default.OK,
    });
}));
exports.userController = {
    createUser,
    getUser,
    getProfile,
    updateUser,
    deleteUser,
    getSingleUser,
};
