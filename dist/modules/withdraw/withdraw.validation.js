"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withdrawValidation = void 0;
const zod_1 = require("zod");
const createWithdrawSchema = zod_1.z.object({
    body: zod_1.z.object({
        agentId: zod_1.z.string().nonempty('Agent ID is required'),
        amount: zod_1.z.number().positive('Amount must be positive'),
        status: zod_1.z.enum(['pending', 'approved', 'rejected']),
    })
});
const updateWithdrawSchema = zod_1.z.object({
    body: zod_1.z.object({
        status: zod_1.z.enum(['pending', 'approved', 'rejected']),
    })
});
exports.withdrawValidation = {
    createWithdrawSchema,
    updateWithdrawSchema,
};
