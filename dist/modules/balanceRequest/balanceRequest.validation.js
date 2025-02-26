"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.balanceRequestValidation = void 0;
const zod_1 = require("zod");
const createBalanceRequestSchema = zod_1.z.object({
    body: zod_1.z.object({
        agentId: zod_1.z.string().nonempty('Agent ID is required'),
        amount: zod_1.z.number().positive('Amount must be positive'),
        status: zod_1.z.enum(['pending', 'approved', 'rejected']),
        isBalanceRequest: zod_1.z.boolean().optional()
    })
});
const updateBalanceRequestSchema = zod_1.z.object({
    body: zod_1.z.object({
        status: zod_1.z.enum(['pending', 'approved', 'rejected']).optional(),
        isBalanceRequest: zod_1.z.boolean().optional()
    })
});
exports.balanceRequestValidation = {
    createBalanceRequestSchema,
    updateBalanceRequestSchema
};
