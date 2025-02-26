import { z } from "zod";
import { USER_TYPE } from "./user.constant";

// Zod Schema for User/Agent Registration
 const userCreateValidationSchema = z.object({
    body : z.object({

   
  name: z
    .string({ required_error: "Name is required" })
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name can't exceed 50 characters"),

  mobile: z
    .string({ required_error: "Mobile number is required" })
    .regex(/^01[3-9]\d{8}$/, "Invalid Bangladeshi mobile number"),

  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email address"),

  pin: z
    .string({ required_error: "PIN is required" })
    .length(5, "PIN must be exactly 5 digits")
    .regex(/^\d{5}$/, "PIN must contain only numbers"),

  nid: z
    .string({ required_error: "NID is required" })
    .min(10, "NID must be at least 10 digits")
    .max(17, "NID can't exceed 17 digits")
    .regex(/^\d+$/, "NID must contain only numbers"),

  accountType: z.enum(["user", "agent", "admin"], {
    required_error: "Account type is required",
  }),

  balance: z
    .number()
    .nonnegative("Balance cannot be negative")
    .optional(), // Default handled in Mongoose Schema

  isBlocked: z.boolean().optional(), 
  isApproved: z.boolean().optional(),
  isRejected: z.boolean().optional(),
  
})


});


const userUpdateValidationSchema = z.object({
  body : z.object({

    name: z.string().min(3, 'Name must be at least 3 characters long').optional(),
    mobile: z.string().regex(/^(\+8801|01)[3-9]\d{8}$/, 'Invalid Bangladeshi mobile number').optional(), // For Bangladeshi numbers
    email: z.string().email('Invalid email address').optional(),
    pin: z.string().length(5, 'PIN must be exactly 5 digits').regex(/^\d+$/, 'PIN must be numeric').optional(),
    nid: z.string().min(10, 'NID must be at least 10 digits').regex(/^\d+$/, 'NID must be numeric').optional(),
    balance: z.number().nonnegative('Balance cannot be negative').optional(),
    accountType: z.enum([USER_TYPE.user, USER_TYPE.agent, USER_TYPE.admin]).optional(),
    isBlocked: z.boolean().optional(),
    isApproved: z.boolean().optional(),
    isRejected: z.boolean().optional(),
})


});



 export const userValidation = {
userCreateValidationSchema,
userUpdateValidationSchema
}