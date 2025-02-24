import { model, Schema } from "mongoose";
import { IUser } from "./user.interface";
import config from "../../app/utils/config";
import bcrypt from 'bcrypt';


const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minlength: 3,
      maxlength: 50,
    },
    mobile: {
      type: String,
      required: [true, "Mobile number is required"],
      unique: true,
      validate: {
        validator: function (value: string) {
          return /^01[3-9]\d{8}$/.test(value); // BD mobile number format
        },
        message: "{VALUE} is not a valid mobile number",
      },
      immutable: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      validate: {
        validator: function (value: string) {
          return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(value);
        },
        message: "{VALUE} is not a valid email",
      },
      immutable: true,
    },
    pin: {
      type: String,
      required: [true, "PIN is required"],
      minlength: 5,
      maxlength: 5,
      select: false, // Exclude from query results
    },
    nid: {
      type: String,
      required: [true, "NID is required"],
      unique: true,
      minlength: 10,
      maxlength: 17,
    },
    balance: {
      type: Number,
      required: true,
      default: 40, // For User, will override for Agent
    },
    accountType: {
      type: String,
      enum: ["User", "Agent"],
      required: true,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save Hook for Hashing PIN
userSchema.pre("save", async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;

  if (user.isModified("pin")) {
    const saltRounds = Number(config.bcrypt_salt_rounds) || 10;
    user.pin = await bcrypt.hash(user.pin, saltRounds);
  }
  next();
});

// Post-save Hook to remove hashed PIN from response
userSchema.post("save", function (doc, next) {
  doc.pin = ""; // Clear PIN in response
  next();
});

// Compare PIN Method
userSchema.methods.comparePin = async function (candidatePin: string): Promise<boolean> {
  return bcrypt.compare(candidatePin, this.pin);
};

// Export Model
const UserModel = model<IUser>("User", userSchema);
export default UserModel;
