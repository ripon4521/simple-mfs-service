"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../app/middleware/validateRequest"));
const cashIn_validation_1 = require("./cashIn.validation");
const cashIn_controller_1 = __importDefault(require("./cashIn.controller"));
const cashInRouter = (0, express_1.Router)();
cashInRouter.post('/create-cashIn', (0, validateRequest_1.default)(cashIn_validation_1.cashInValidation.createCashInValidation), cashIn_controller_1.default);
exports.default = cashInRouter;
