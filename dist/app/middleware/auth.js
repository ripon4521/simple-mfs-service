"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const user_model_1 = __importDefault(require("../../modules/user/user.model"));
const auth = (...requiredRoles) => {
    return (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new Error('You are not authorized!');
        }
        const token = authHeader.split(' ')[1]; // Extract token after 'Bearer'
        const decoded = jsonwebtoken_1.default.verify(token, "primarytestkey");
        const { mobile } = decoded;
        //   console.log(accountType, mobile);
        const user = yield user_model_1.default.findOne({ mobile });
        //   console.log(user?.accountType);
        if (!user) {
            throw new Error('This user is not found!');
        }
        if (user.isBlocked) {
            throw new Error('This user is blocked!');
        }
        if (requiredRoles.length && !requiredRoles.includes(user === null || user === void 0 ? void 0 : user.accountType)) {
            throw new Error('You are not authorized!');
        }
        req.user = decoded; // Attach decoded token to req.user
        next();
    }));
};
exports.default = auth;
