import { ObjectId } from "mongoose";
export interface Transaction {
    senderId: ObjectId;
    receiverNumber: string;
    amount: number;
    fee: number;
    type: "SendMoney" | "CashIn" | "CashOut";
    transactionId: string;
  
  }
  