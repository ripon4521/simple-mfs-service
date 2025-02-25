import mongoose, { Schema, Document } from 'mongoose';
import { ICashIn } from './cashIn.interface';

const cashInSchema = new Schema<ICashIn & Document>(
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
    },
    fee: {
      type: Number,
      required: true,
      default: 0,
    },
    type: {
      type: String,
      enum: ['CashIn'],
      required: true,
    },
    transactionId: {
      type: String,
      unique: true,
      required: true,
    },
    pin: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

cashInSchema.virtual('receiver', {
  ref: 'User',
  localField: 'receiverNumber',
  foreignField: 'mobile',
  justOne: true,
});

cashInSchema.set('toObject', { virtuals: true });
cashInSchema.set('toJSON', { virtuals: true });

const cashInModel = mongoose.model<ICashIn & Document>('CashOut', cashInSchema);

export default cashInModel;
