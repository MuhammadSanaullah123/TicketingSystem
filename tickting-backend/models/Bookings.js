const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    trip: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trip",
    },
    NoOfpassengers: {
      type: String,
    },
    bookingId: {
      type: String,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    transactionId: {
      type: String,
    },
    paymentId: {
      type: String,
    },
    bookingStatus: {
      type: String,
      default: "Active",
    },
    noOfSeats: {
      type: Number,
    },
    seats: {
      type: [Number],
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    passengerDetails: [
      {
        firstName: {
          type: String,
          required: true,
        },
        middleName: {
          type: String,
          required: true,
        },
        lastName: {
          type: String,
        },
        gender: {
          type: String,
          enum: ["Male", "Female", "Others"],
          required: true,
        },
        dob: {
          type: String,
        },
        passportNumber: {
          type: String,
        },
        country: {
          type: String,
        },
        image: {
          type: String,
        },
      },
    ],
    price: {
      type: Number,
    },

    isPaymentDone: {
      type: Boolean,
      default: false,
    },
    additionalDetails: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    bookedBy: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;
