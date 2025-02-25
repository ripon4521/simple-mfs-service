import { z } from 'zod';

// Define the simplified Transaction validation schema
const createSendMoneyValidation = z.object({
  body: z.object({
    senderId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid senderId format'), // Validating ObjectId format
    receiverNumber: z.string().min(10).max(11), // Ensure receiverNumber is a valid phone number length
    amount: z.number().min(50, 'Minimum send amount is 50 Taka'), // Minimum 50 Taka for send amount
    fee: z.number().min(0, 'Fee cannot be negative'), // Ensure fee is a non-negative number
    type: z.enum(['SendMoney']), // Enum for transaction type
   // Ensure transactionId length is valid
  }),
});

export const sendMoneyValidation = {
  createSendMoneyValidation
};