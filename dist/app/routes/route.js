"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_router_1 = __importDefault(require("../../modules/user/user.router"));
const auth_router_1 = __importDefault(require("../../modules/auth/auth.router"));
const transction_router_1 = __importDefault(require("../../modules/transction/transction.router"));
const systemBalance_router_1 = __importDefault(require("../../modules/systemBalance/systemBalance.router"));
const sendMoney_router_1 = __importDefault(require("../../modules/sendMoney/sendMoney.router"));
const cashOut_router_1 = __importDefault(require("../../modules/cashOut/cashOut.router"));
const cashIn_router_1 = __importDefault(require("../../modules/cashIn/cashIn.router"));
const balancerequest_router_1 = __importDefault(require("../../modules/balanceRequest/balancerequest.router"));
const withdaraw_router_1 = __importDefault(require("../../modules/withdraw/withdaraw.router"));
const agentNotification_router_1 = __importDefault(require("../../modules/agentNotification/agentNotification.router"));
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/user',
        route: user_router_1.default,
    },
    {
        path: '/auth',
        route: auth_router_1.default,
    }, {
        path: '/transction',
        route: transction_router_1.default
    }, {
        path: '/systemBalance',
        route: systemBalance_router_1.default
    }, {
        path: '/sendmoney',
        route: sendMoney_router_1.default
    }, {
        path: '/cashout',
        route: cashOut_router_1.default
    }, {
        path: '/cashIn',
        route: cashIn_router_1.default
    }, {
        path: '/balance',
        route: balancerequest_router_1.default
    }, {
        path: '/withdraw',
        route: withdaraw_router_1.default
    }, {
        path: '/notification',
        route: agentNotification_router_1.default
    }
];
moduleRoutes.forEach((route) => {
    router.use(route.path, route.route);
});
exports.default = router;
