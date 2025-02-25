import { z } from 'zod';

 const createWithdrawSchema = z.object({
    body:z.object({

   
  agentId: z.string().nonempty('Agent ID is required'),
  amount: z.number().positive('Amount must be positive'),
  status: z.enum(['pending', 'approved', 'rejected']),
})
});

 const updateWithdrawSchema = z.object({
    body:z.object({

   
  status: z.enum(['pending', 'approved', 'rejected']),
})
});

export const withdrawValidation = {
   createWithdrawSchema,
   updateWithdrawSchema,
}

