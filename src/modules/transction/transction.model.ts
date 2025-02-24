import mongoose, { Schema, Document } from 'mongoose';
import { Transaction } from './transction.interface';

// Define the Transaction schema
const transactionSchema = new Schema({
  senderId: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Assuming there is a User model
    required: true
  },
  receiverId: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Assuming there is a User model
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  fee: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    enum: ['SendMoney', 'CashIn', 'CashOut'],
    required: true
  },
  transactionId: {
    type: String,
    unique: true,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create a Mongoose model based on the schema
const Transaction = mongoose.model<Transaction & Document>('Transaction', transactionSchema);

export default Transaction;
