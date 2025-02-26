"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const notFoundRoutes_1 = __importDefault(require("./app/middleware/notFoundRoutes"));
const route_1 = __importDefault(require("./app/routes/route"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api/v1', route_1.default);
const getAcontroller = (req, res) => {
    res.send('Welcome to the simple MFS - mobile financial service web server!');
};
app.get('/', getAcontroller);
app.use(notFoundRoutes_1.default);
exports.default = app;
