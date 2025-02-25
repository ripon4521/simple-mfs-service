import { ObjectId } from "mongoose";

export interface ICashIn {
    senderId: ObjectId;
    receiverNumber: string;
    amount: number;
    pin:string;
    fee: number;
    type: "CashIn";
    transactionId: string;
  
  }
  


