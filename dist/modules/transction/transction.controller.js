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
exports.transctionController = void 0;
const catchAsync_1 = __importDefault(require("../../app/utils/catchAsync"));
const transction_service_1 = require("./transction.service");
const http_status_1 = __importDefault(require("http-status"));
const sendResponse_1 = __importDefault(require("../../app/utils/sendResponse"));
const createTransctions = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const result = yield transction_service_1.transctionService.createTransction(payload);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "Transaction created successfully",
        data: result,
        statusCode: http_status_1.default.CREATED,
    });
}));
const deleteTransction = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield transction_service_1.transctionService.deleteTransaction(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "Transaction deleted successfully",
        data: result,
        statusCode: http_status_1.default.OK,
    });
}));
const getTransctions = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield transction_service_1.transctionService.getTransactions();
    (0, sendResponse_1.default)(res, {
        success: true,
        message: "Transactions fetched successfully",
        data: result,
        statusCode: http_status_1.default.OK,
    });
}));
exports.transctionController = {
    createTransctions,
    deleteTransction,
    getTransctions,
};
