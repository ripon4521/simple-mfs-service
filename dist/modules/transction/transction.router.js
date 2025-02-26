"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../app/middleware/validateRequest"));
const transction_controller_1 = require("./transction.controller");
const transction_validation_1 = require("./transction.validation");
const transctionRouter = (0, express_1.Router)();
transctionRouter.post('/create-transaction', (0, validateRequest_1.default)(transction_validation_1.transactionValidation.transactionSchema), transction_controller_1.transctionController.createTransctions);
transctionRouter.delete('/:id', transction_controller_1.transctionController.deleteTransction);
transctionRouter.get('/', transction_controller_1.transctionController.getTransctions);
exports.default = transctionRouter;
