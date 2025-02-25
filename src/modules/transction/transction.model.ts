import mongoose, { Schema, Document } from 'mongoose';
import { Transaction } from './transction.interface';

// Define the Transaction schema
const transactionSchema = new Schema<Transaction & Document>(
  {
    senderId: {
      type: Schema.Types.ObjectId,
      ref: 'User', 
      required: true,
    },
    receiverNumber: {
      type: String, 
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: [50, 'Minimum transaction amount is 50 Taka.'], 
    },
    fee: {
      type: Number,
      required: true,
      default: 0, 
    },
    type: {
      type: String,
      enum: ['SendMoney', 'CashIn', 'CashOut'],
      required: true,
    },
    transactionId: {
      type: String,
      unique: true,
      required: true,
    },
  },
  {
    timestamps: true, 
  }
);


transactionSchema.virtual('receiver', {
  ref: 'User',
  localField: 'receiverNumber',
  foreignField: 'mobile', 
  justOne: true,
});

// Enable virtuals in JSON and Object responses
transactionSchema.set('toObject', { virtuals: true });
transactionSchema.set('toJSON', { virtuals: true });


const transactionModel = mongoose.model<Transaction & Document>('Transaction', transactionSchema);

export default transactionModel;
