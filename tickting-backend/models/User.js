const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
    },
    password: {
      type: String,
    },
    customerId: {
      type: String,
    },
    image: {
      type: String,
    },
    walletId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Wallet",
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    phone: {
      type: String,
    },
    googleId: {
      type: String,
    },
    address: {
      type: String,
    },
    civilianId: {
      type: String,
    },
    role: {
      type: String,
      enum: ["operator", "customer", "admin"],
      default: "customer",
    },
    resetToken: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
