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
exports.systemBalanceController = void 0;
const catchAsync_1 = __importDefault(require("../../app/utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../app/utils/sendResponse"));
const sendResponse_2 = __importDefault(require("../../app/utils/sendResponse"));
const systembalance_service_1 = require("./systembalance.service");
const http_status_1 = __importDefault(require("http-status"));
const getSystemBalance = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const systemBalance = yield systembalance_service_1.systemBalanceService.getSystemBalance();
    (0, sendResponse_2.default)(res, {
        success: true,
        message: "System Balance Get Successfully",
        data: systemBalance,
        statusCode: http_status_1.default.OK,
    });
}));
const updateSystemBalance = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const { id } = req.params;
    const systemBalance = yield systembalance_service_1.systemBalanceService.updateSystemBalance(id, payload);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "System Balance Update Successfully",
        data: systemBalance,
        statusCode: http_status_1.default.OK,
    });
}));
const deleteSystemBalance = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield systembalance_service_1.systemBalanceService.deleteSystemBalance(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "System Balance delete Successfully",
        data: '',
        statusCode: http_status_1.default.OK,
    });
}));
exports.systemBalanceController = {
    getSystemBalance,
    updateSystemBalance,
    deleteSystemBalance,
};
