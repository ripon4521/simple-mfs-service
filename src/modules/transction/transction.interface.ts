import { ObjectId } from "mongoose";
export interface Transaction {
    _id: ObjectId;
    senderId: ObjectId;
    receiverId: ObjectId;
    amount: number;
    fee: number;
    type: "SendMoney" | "CashIn" | "CashOut";
    transactionId: string;
    createdAt: Date;
  }
  