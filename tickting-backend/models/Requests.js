const mongoose = require("mongoose");

const RequestsSchema = new mongoose.Schema(
  {
    requestId: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    mobnumber: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Requests = mongoose.model("Requests", RequestsSchema);
module.exports = Requests;
