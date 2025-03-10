import { USER_TYPE } from "./user.constant";

export interface IUser {            // Auto-generated by MongoDB
  name: string;               // User's full name
  mobile: string;             // Unique mobile number
  email: string;              // User's email
  pin: string;                // Security PIN for transactions
  nid: string;                // National ID for verification
  balance: number;            // Default: 40 for User, 100,000 for Agent
  accountType: TUserRole;     // "user" | "agent" | "admin"
  isBlocked?: boolean;        // For blocking users (default: false)
  isApproved?: boolean;
  isRejected: boolean;   
}

export type TUserRole = keyof typeof USER_TYPE;
