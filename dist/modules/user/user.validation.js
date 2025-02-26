"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = void 0;
const zod_1 = require("zod");
const user_constant_1 = require("./user.constant");
// Zod Schema for User/Agent Registration
const userCreateValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string({ required_error: "Name is required" })
            .min(3, "Name must be at least 3 characters")
            .max(50, "Name can't exceed 50 characters"),
        mobile: zod_1.z
            .string({ required_error: "Mobile number is required" })
            .regex(/^01[3-9]\d{8}$/, "Invalid Bangladeshi mobile number"),
        email: zod_1.z
            .string({ required_error: "Email is required" })
            .email("Invalid email address"),
        pin: zod_1.z
            .string({ required_error: "PIN is required" })
            .length(5, "PIN must be exactly 5 digits")
            .regex(/^\d{5}$/, "PIN must contain only numbers"),
        nid: zod_1.z
            .string({ required_error: "NID is required" })
            .min(10, "NID must be at least 10 digits")
            .max(17, "NID can't exceed 17 digits")
            .regex(/^\d+$/, "NID must contain only numbers"),
        accountType: zod_1.z.enum(["user", "agent", "admin"], {
            required_error: "Account type is required",
        }),
        balance: zod_1.z
            .number()
            .nonnegative("Balance cannot be negative")
            .optional(), // Default handled in Mongoose Schema
        isBlocked: zod_1.z.boolean().optional(),
        isApproved: zod_1.z.boolean().optional(),
        isRejected: zod_1.z.boolean().optional(),
    })
});
const userUpdateValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(3, 'Name must be at least 3 characters long').optional(),
        mobile: zod_1.z.string().regex(/^(\+8801|01)[3-9]\d{8}$/, 'Invalid Bangladeshi mobile number').optional(), // For Bangladeshi numbers
        email: zod_1.z.string().email('Invalid email address').optional(),
        pin: zod_1.z.string().length(5, 'PIN must be exactly 5 digits').regex(/^\d+$/, 'PIN must be numeric').optional(),
        nid: zod_1.z.string().min(10, 'NID must be at least 10 digits').regex(/^\d+$/, 'NID must be numeric').optional(),
        balance: zod_1.z.number().nonnegative('Balance cannot be negative').optional(),
        accountType: zod_1.z.enum([user_constant_1.USER_TYPE.user, user_constant_1.USER_TYPE.agent, user_constant_1.USER_TYPE.admin]).optional(),
        isBlocked: zod_1.z.boolean().optional(),
        isApproved: zod_1.z.boolean().optional(),
        isRejected: zod_1.z.boolean().optional(),
    })
});
exports.userValidation = {
    userCreateValidationSchema,
    userUpdateValidationSchema
};
