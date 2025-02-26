"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cashInValidation = void 0;
const zod_1 = require("zod");
// Define the simplified Transaction validation schema
const createCashInValidation = zod_1.z.object({
    body: zod_1.z.object({
        senderId: zod_1.z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid senderId format'),
        receiverNumber: zod_1.z.string().min(10).max(11),
        amount: zod_1.z.number(),
        fee: zod_1.z.number().min(0, 'Fee cannot be negative'),
        type: zod_1.z.enum(['CashIn']),
        pin: zod_1.z.string().length(5, 'PIN must be exactly 5 digits').regex(/^\d+$/, 'PIN must be numeric'),
    }),
});
exports.cashInValidation = {
    createCashInValidation
};
