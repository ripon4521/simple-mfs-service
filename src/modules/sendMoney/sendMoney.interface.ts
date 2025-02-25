

import { ObjectId } from "mongoose";
export interface ISendMoney {
    senderId: ObjectId;
    receiverNumber: string;
    amount: number;
    fee: number;
    type: "SendMoney";
    transactionId: string;
  
  }
  


