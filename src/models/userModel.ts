import mongoose from "mongoose";

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
    },
    firebaseIdentifier: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },
    kycStatus: {
      isKYCDone: {
        type: Boolean,
        required: true,
        default: false,
      },
      isAadharFrontVerified: {
        type: Boolean,
        required: true,
        default: false,
      },
      isAadharBackVerified: {
        type: Boolean,
        required: true,
        default: false,
      },
      isPanCardVerified: {
        type: Boolean,
        required: true,
        default: false,
      },
      isSelfieVerified: {
        type: Boolean,
        required: true,
        default: false,
      },
      isManualKYCApprovalInitiated: {
        type: Boolean,
        required: true,
        default: false,
      },
    },
    _private: {
      _vauldUserId: {
        type: String,
        required: [false, "vauld user key is required"],
      },
    },
    investments: [
      {
        type: Schema.Types.ObjectId,
        ref: "investments",
        required: false,
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("users", UserSchema);

export default User;
