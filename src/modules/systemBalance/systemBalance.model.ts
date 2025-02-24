
import mongoose, { Schema } from 'mongoose';



export  interface systemBalance  {
    totalBalance: number;
}

const systemBalanceSchema = new Schema({
  totalBalance: {
    type: Number,
    required: true,
    default: 0,
  }
});

const SystemBalance = mongoose.model('SystemBalance', systemBalanceSchema);

export default SystemBalance;
