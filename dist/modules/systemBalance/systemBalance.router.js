"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const systemBalance_controller_1 = require("./systemBalance.controller");
const systemBalanceRouter = (0, express_1.Router)();
systemBalanceRouter.get('/', systemBalance_controller_1.systemBalanceController.getSystemBalance);
systemBalanceRouter.post('/:id', systemBalance_controller_1.systemBalanceController.updateSystemBalance);
systemBalanceRouter.delete('/:id', systemBalance_controller_1.systemBalanceController.deleteSystemBalance);
exports.default = systemBalanceRouter;
