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
exports.withdrawController = void 0;
const catchAsync_1 = __importDefault(require("../../app/utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../app/utils/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const withdraw_service_1 = require("./withdraw.service");
const cerateWithdraw = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const result = yield withdraw_service_1.withdrawService.createWithdraw(payload);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "ithdraw Request  successful",
        data: result,
        statusCode: http_status_1.default.CREATED,
    });
}));
const getAllWithdraw = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield withdraw_service_1.withdrawService.getAllWithdraw();
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "All Withdraw Requests fetched successfully",
        data: result,
        statusCode: http_status_1.default.OK,
    });
}));
const deleteWWithdraw = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield withdraw_service_1.withdrawService.deleteWithdraw(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "Withdraw Request Deleted successfully",
        data: result,
        statusCode: http_status_1.default.OK,
    });
}));
const updateWithdraw = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const payload = req.body;
    const result = yield withdraw_service_1.withdrawService.updateWithdraw(id, payload);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "Withdraw Request updated successfully",
        data: result,
        statusCode: http_status_1.default.OK,
    });
}));
const getSingleWithdraw = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield withdraw_service_1.withdrawService.getWithdrawById(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "Wiothdraw Request fetched successfully",
        data: result,
        statusCode: http_status_1.default.OK,
    });
}));
exports.withdrawController = {
    cerateWithdraw,
    getAllWithdraw,
    deleteWWithdraw,
    updateWithdraw,
    getSingleWithdraw,
};
