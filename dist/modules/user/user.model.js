"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const config_1 = __importDefault(require("../../app/utils/config"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const userSchema = new mongoose_1.Schema({
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
            validator: function (value) {
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
            validator: function (value) {
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
        enum: ["user", "agent", "admin"],
        required: true,
    },
    isBlocked: {
        type: Boolean,
        default: false,
    },
    isApproved: {
        type: Boolean,
        default: false, // For Agents - needs Admin Approval
    },
    isRejected: {
        type: Boolean,
        default: false, // For Agents - needs Admin Approval
    },
}, {
    timestamps: true,
});
// Pre-save Hook for Hashing PIN
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const user = this;
        if (user.isModified("pin")) {
            const saltRounds = Number(config_1.default.bcrypt_salt_rounds);
            user.pin = yield bcrypt_1.default.hash(user.pin, saltRounds);
        }
        next();
    });
});
userSchema.methods.toJSON = function () {
    const userObject = this.toObject();
    delete userObject.pin; // Response থেকে hashed PIN সরানো
    return userObject;
};
userSchema.methods.comparePin = function (candidatePin) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.pin) {
            throw new Error("PIN is not set for this user.");
        }
        return bcrypt_1.default.compare(candidatePin, this.pin);
    });
};
// Export Model
const UserModel = (0, mongoose_1.model)("User", userSchema);
exports.default = UserModel;
