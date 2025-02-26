import { z } from 'zod';

 const createBalanceRequestSchema = z.object({
    body:z.object({

   
  agentId: z.string().nonempty('Agent ID is required'),
  amount: z.number().positive('Amount must be positive'),
  status: z.enum(['pending', 'approved', 'rejected']),
  isBalanceRequest: z.boolean().optional()
})
});

 const updateBalanceRequestSchema = z.object({
    body:z.object({

   
  status: z.enum(['pending', 'approved', 'rejected']).optional(),
  isBalanceRequest:z.boolean().optional()
})
});

export const balanceRequestValidation = {
    createBalanceRequestSchema,
    updateBalanceRequestSchema
}

