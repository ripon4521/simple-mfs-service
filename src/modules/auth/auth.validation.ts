import { z } from 'zod';

const loginValidationSchema = z.object({
  body: z.object({
    mobile: z.string({
      required_error: "Mobile number must be provided and must be a string",
    }).min(10, "Mobile number must be at least 10 digits").max(15, "Mobile number cannot exceed 15 digits"),
    pin: z.string({ required_error: 'PIN is required' }).min(4, 'PIN must be at least 4 characters').max(6, 'PIN cannot exceed 6 characters'),
  }),
});

export const AuthValidation = {
  loginValidationSchema,
};
