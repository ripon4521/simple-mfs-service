import mongoose, { Schema, Document } from 'mongoose';
import { ICashOut } from './cashOut.interface';



// Define the Transaction schema
const cashOutSchema = new Schema<ICashOut & Document>(
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
      enum: ['CashOut'],
      required: true,
    },
    transactionId: {
      type: String,
      unique: true,
      required: true,
    },
    pin:{
      type: String,
      required: true,
    }
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
  }
);

// Virtual populate for receiver using mobile number
cashOutSchema.virtual('receiver', {
  ref: 'User',
  localField: 'receiverNumber',
  foreignField: 'mobile', // Assuming User schema has a 'mobile' field
  justOne: true,
});

// Enable virtuals in JSON and Object responses
cashOutSchema.set('toObject', { virtuals: true });
cashOutSchema.set('toJSON', { virtuals: true });

// Create a Mongoose model based on the schema
const cashOutModel = mongoose.model<ICashOut & Document>('CashOut', cashOutSchema);

export default cashOutModel;
