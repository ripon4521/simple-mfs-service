import {  USER_TYPE } from "./user.constant";

export interface IUser {
    _id?: string;             
    name: string;               
    mobile: string;           
    email: string;          
    pin: string;               
    nid: string;                
    balance: number;           // Default: 40 for User, 100000 for Agent
    accountType: "user" | "agent" | "admin";  
    isBlocked?: boolean;        
          // Auto-generated
  }
  

  export type TUserRole = keyof typeof USER_TYPE;