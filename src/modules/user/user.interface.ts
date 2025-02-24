export interface IUser {
    _id?: string;             
    name: string;               
    mobile: string;           
    email: string;          
    pin: string;               
    nid: string;                
    balance: number;           // Default: 40 for User, 100000 for Agent
    accountType: "User" | "Agent";  
    isBlocked?: boolean;        
          // Auto-generated
  }
  