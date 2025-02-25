import mongoose, { Schema } from 'mongoose';
import { IBalanceRequest } from './balanceRequest.inteface';

const BalanceRequestSchema: Schema = new Schema(
  {
    agentId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User model
    amount: { type: Number, required: true, min: 50 },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
      required: true,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt fields
  }
);

const balanceRequestModel = mongoose.model<IBalanceRequest>(
  'BalanceRequest',
  BalanceRequestSchema
);

export default balanceRequestModel;
