import mongoose, { Schema, Document } from 'mongoose';
import { ISendMoney } from './sendMoney.interface';



const sendMoneySchema = new Schema<ISendMoney & Document>(
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
      enum: ['SendMoney'],
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


sendMoneySchema.virtual('receiver', {
  ref: 'User',
  localField: 'receiverNumber',
  foreignField: 'mobile', 
  justOne: true,
});

// Enable virtuals in JSON and Object responses
sendMoneySchema.set('toObject', { virtuals: true });
sendMoneySchema.set('toJSON', { virtuals: true });


const sendMoneyModel = mongoose.model<ISendMoney & Document>('SendMoney', sendMoneySchema);

export default sendMoneyModel;
