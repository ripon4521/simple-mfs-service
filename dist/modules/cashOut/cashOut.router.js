"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../app/middleware/validateRequest"));
const cashOut_validation_1 = require("./cashOut.validation");
const cashOut_controller_1 = __importDefault(require("./cashOut.controller"));
const cashOutRoute = (0, express_1.Router)();
cashOutRoute.post('/create-cashout', (0, validateRequest_1.default)(cashOut_validation_1.cashOutValidation.createCashOutValidation), cashOut_controller_1.default);
exports.default = cashOutRoute;
