import mongoose, { Schema, Document } from 'mongoose';
import { ISendMoney } from './sendMoney.interface';


// Define the Transaction schema
const sendMoneySchema = new Schema<ISendMoney & Document>(
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
    timestamps: true, // Adds createdAt and updatedAt
  }
);

// Virtual populate for receiver using mobile number
sendMoneySchema.virtual('receiver', {
  ref: 'User',
  localField: 'receiverNumber',
  foreignField: 'mobile', // Assuming User schema has a 'mobile' field
  justOne: true,
});

// Enable virtuals in JSON and Object responses
sendMoneySchema.set('toObject', { virtuals: true });
sendMoneySchema.set('toJSON', { virtuals: true });

// Create a Mongoose model based on the schema
const sendMoneyModel = mongoose.model<ISendMoney & Document>('SendMoney', sendMoneySchema);

export default sendMoneyModel;
