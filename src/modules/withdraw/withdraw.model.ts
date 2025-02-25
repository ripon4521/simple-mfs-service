import mongoose, { Schema } from 'mongoose';
import { IWithdraw } from './withdaw.interface';


const withdrawSchema = new Schema(
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

const withdrawModel = mongoose.model<IWithdraw>(
  'Withdraw',
  withdrawSchema
);

export default withdrawModel;
