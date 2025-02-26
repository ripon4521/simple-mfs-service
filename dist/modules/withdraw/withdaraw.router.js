"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../app/middleware/validateRequest"));
const withdraw_validation_1 = require("./withdraw.validation");
const withdraw_controller_1 = require("./withdraw.controller");
const withdrawRouter = (0, express_1.Router)();
withdrawRouter.post('/create-withdraw', (0, validateRequest_1.default)(withdraw_validation_1.withdrawValidation.createWithdrawSchema), withdraw_controller_1.withdrawController.cerateWithdraw);
withdrawRouter.get('/', withdraw_controller_1.withdrawController.getAllWithdraw);
withdrawRouter.get('/:id', withdraw_controller_1.withdrawController.getSingleWithdraw);
withdrawRouter.patch('/:id', withdraw_controller_1.withdrawController.updateWithdraw);
withdrawRouter.delete('/:id', withdraw_controller_1.withdrawController.deleteWWithdraw);
exports.default = withdrawRouter;
