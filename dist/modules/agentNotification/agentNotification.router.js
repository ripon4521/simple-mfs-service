"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const agentnotification_controller_1 = require("./agentnotification.controller");
const notificationrouter = express_1.default.Router();
notificationrouter.get('/', agentnotification_controller_1.notifcationControllr.getAllNotification);
exports.default = notificationrouter;
