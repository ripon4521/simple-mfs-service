import { ObjectId } from "mongoose";

export interface ICashOut {
    senderId: ObjectId;
    receiverNumber: string;
    amount: number;
    pin:string;
    fee: number;
    type: "CashOut";
    transactionId: string;
  
  }
  


