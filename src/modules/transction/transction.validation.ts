import { z } from 'zod';

// Define the simplified Transaction validation schema
const transactionSchema = z.object({
    body:z.object({

 
  senderId: z.string(), // Basic string validation for senderId
  receiverId: z.string(), // Basic string validation for receiverId
  amount: z.number().min(0), // Ensure amount is a positive number
  fee: z.number().min(0), // Ensure fee is a positive number
  type: z.enum(['SendMoney', 'CashIn', 'CashOut']), // Enum for transaction type
  transactionId: z.string(), // Basic string validation for transactionId
  createdAt: z.date(), // Ensure createdAt is a valid Date
})   });

 export const transctionValidation = {
    transactionSchema,
}

