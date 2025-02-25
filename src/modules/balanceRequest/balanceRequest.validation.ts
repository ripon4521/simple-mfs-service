import { z } from 'zod';

 const createBalanceRequestSchema = z.object({
    body:z.object({

   
  agentId: z.string().nonempty('Agent ID is required'),
  amount: z.number().positive('Amount must be positive'),
  status: z.enum(['pending', 'approved', 'rejected']),
})
});

 const updateBalanceRequestSchema = z.object({
    body:z.object({

   
  status: z.enum(['pending', 'approved', 'rejected']),
})
});

export const balanceRequestValidation = {
    createBalanceRequestSchema,
    updateBalanceRequestSchema
}

