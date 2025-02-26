import mongoose, { Schema } from 'mongoose';
import { IBalanceRequest } from './balanceRequest.inteface';

const BalanceRequestSchema: Schema = new Schema(
  {
    agentId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true, min: 50 },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
      required: true,
    },
    isBalanceRequest: {
      type: Boolean,
      default: true, // For Agents - needs Admin Approval
    },
  },
  {
    timestamps: true,
  },
);

const balanceRequestModel = mongoose.model<IBalanceRequest>(
  'BalanceRequest',
  BalanceRequestSchema,
);

export default balanceRequestModel;
