"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = void 0;
const zod_1 = require("zod");
const loginValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        mobile: zod_1.z.string({
            required_error: "Mobile number must be provided and must be a string",
        }).min(10, "Mobile number must be at least 10 digits").max(15, "Mobile number cannot exceed 15 digits"),
        pin: zod_1.z.string({ required_error: 'PIN is required' }).min(4, 'PIN must be at least 4 characters').max(6, 'PIN cannot exceed 6 characters'),
    }),
});
exports.AuthValidation = {
    loginValidationSchema,
};
