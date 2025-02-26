"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../app/middleware/validateRequest"));
const sendMoney_validation_1 = require("./sendMoney.validation");
const sendMoney_controller_1 = require("./sendMoney.controller");
const sendMoneyRouter = (0, express_1.Router)();
sendMoneyRouter.post('/create-sendmoney', (0, validateRequest_1.default)(sendMoney_validation_1.sendMoneyValidation.createSendMoneyValidation), sendMoney_controller_1.sendMoneyContoller.createSendMoney);
exports.default = sendMoneyRouter;
