import { z } from 'zod';

// Define the simplified Transaction validation schema
const createCashInValidation = z.object({
  body: z.object({
    senderId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid senderId format'), 
    receiverNumber: z.string().min(10).max(11), 
    amount: z.number(), 
    fee: z.number().min(0, 'Fee cannot be negative'), 
    type: z.enum(['CashIn']), 
    pin: z.string().length(5, 'PIN must be exactly 5 digits').regex(/^\d+$/, 'PIN must be numeric'),
   
  }),
});

export const cashInValidation = {
createCashInValidation
};