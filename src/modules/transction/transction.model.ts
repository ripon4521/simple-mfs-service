import mongoose, { Schema, Document } from 'mongoose';
import { Transaction } from './transction.interface';

// Define the Transaction schema
const transactionSchema = new Schema<Transaction & Document>(
  {
    senderId: {
      type: Schema.Types.ObjectId,
      ref: 'User', // Refers to User's _id
      required: true,
    },
    receiverNumber: {
      type: String, // Storing mobile number
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: [50, 'Minimum transaction amount is 50 Taka.'], // Schema-level validation
    },
    fee: {
      type: Number,
      required: true,
      default: 0, // Default fee to 0
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
    timestamps: true, // Adds createdAt and updatedAt
  }
);

// Virtual populate for receiver using mobile number
transactionSchema.virtual('receiver', {
  ref: 'User',
  localField: 'receiverNumber',
  foreignField: 'mobile', // Assuming User schema has a 'mobile' field
  justOne: true,
});

// Enable virtuals in JSON and Object responses
transactionSchema.set('toObject', { virtuals: true });
transactionSchema.set('toJSON', { virtuals: true });

// Create a Mongoose model based on the schema
const transactionModel = mongoose.model<Transaction & Document>('Transaction', transactionSchema);

export default transactionModel;
