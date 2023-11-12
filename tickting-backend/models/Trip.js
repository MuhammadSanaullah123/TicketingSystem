const mongoose = require("mongoose");

const TripSchema = new mongoose.Schema(
  {
    busId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bus",
    },

    departureTime: {
      type: String,
      required: true,
    },
    arrivalTime: {
      type: String,
      required: true,
    },
    routeFrom: {
      type: String,
    },
    routeTo: {
      type: String,
    },
    daysOfWeek: {
      type: [String],
    },
    transit: {
      type: [String],
    },

    rating: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Reviews",
    },
    price: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    processed: {
      type: Boolean,
      default: false,
    },
    regularTrips: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Trip = mongoose.model("Trip", TripSchema);
module.exports = Trip;
