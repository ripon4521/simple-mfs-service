"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMoneyValidation = void 0;
const zod_1 = require("zod");
// Define the simplified Transaction validation schema
const createSendMoneyValidation = zod_1.z.object({
    body: zod_1.z.object({
        senderId: zod_1.z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid senderId format'), // Validating ObjectId format
        receiverNumber: zod_1.z.string().min(10).max(11), // Ensure receiverNumber is a valid phone number length
        amount: zod_1.z.number().min(50, 'Minimum send amount is 50 Taka'), // Minimum 50 Taka for send amount
        fee: zod_1.z.number().min(0, 'Fee cannot be negative'), // Ensure fee is a non-negative number
        type: zod_1.z.enum(['SendMoney']), // Enum for transaction type
        // Ensure transactionId length is valid
    }),
});
exports.sendMoneyValidation = {
    createSendMoneyValidation
};
