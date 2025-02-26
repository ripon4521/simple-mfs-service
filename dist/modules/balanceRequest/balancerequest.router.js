"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../app/middleware/validateRequest"));
const balanceRequest_validation_1 = require("./balanceRequest.validation");
const balanceRequest_controller_1 = require("./balanceRequest.controller");
const balanceRequestRouter = (0, express_1.Router)();
balanceRequestRouter.post('/cerate-balanceRequest', (0, validateRequest_1.default)(balanceRequest_validation_1.balanceRequestValidation.createBalanceRequestSchema), balanceRequest_controller_1.balanceRequestController.cerateBalanceRequest);
balanceRequestRouter.get('/', balanceRequest_controller_1.balanceRequestController.getAllBalanceRequests);
balanceRequestRouter.get('/:id', balanceRequest_controller_1.balanceRequestController.getBalanceRequestById);
balanceRequestRouter.patch('/:id', (0, validateRequest_1.default)(balanceRequest_validation_1.balanceRequestValidation.updateBalanceRequestSchema), balanceRequest_controller_1.balanceRequestController.updateBalanceRequestById);
balanceRequestRouter.delete('/:id', balanceRequest_controller_1.balanceRequestController.deleteBalanceRequestById);
exports.default = balanceRequestRouter;
