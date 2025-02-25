import mongoose, { Schema } from 'mongoose';

const NotificationSchema = new Schema(
  {
    agentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: String, required: true },
    type: { type: String, required: true },
    status: { type: String, enum: ['read', 'unread'], default: 'unread' },
  },
  { timestamps: true }
);

const NotificationModel = mongoose.model('Notification', NotificationSchema);

export { NotificationModel };
