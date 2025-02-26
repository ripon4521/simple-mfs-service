"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../app/middleware/validateRequest"));
const user_validation_1 = require("./user.validation");
const user_controller_1 = require("./user.controller");
const auth_1 = __importDefault(require("../../app/middleware/auth"));
const userRoute = (0, express_1.Router)();
userRoute.post('/create-user', (0, validateRequest_1.default)(user_validation_1.userValidation.userCreateValidationSchema), user_controller_1.userController.createUser);
userRoute.get('/profile', (0, auth_1.default)(), user_controller_1.userController.getProfile);
userRoute.get('/', user_controller_1.userController.getUser);
userRoute.get('/:id', user_controller_1.userController.getSingleUser);
userRoute.patch('/:id', (0, validateRequest_1.default)(user_validation_1.userValidation.userUpdateValidationSchema), user_controller_1.userController.updateUser);
userRoute.delete('/:id', user_controller_1.userController.deleteUser);
exports.default = userRoute;
