const mongoose = require("mongoose");

const operatorSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    operatorId: {
      type: String,
    },
    image: {
      type: String,
    },
    companyname: {
      type: String,
    },
    username: {
      type: String,
      // required: true
    },
    contactnumber: {
      type: String,
    },
    /*   email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    }, */
    companyaddress: {
      type: String,
    },
    companycontactnumber: {
      type: String,
    },
    companylocation: {
      lat: {
        type: Number,
      },
      lng: {
        type: Number,
      },
    },
    busStations: [
      {
        images: {
          type: String,
        },

        location: {
          lat: {
            type: Number,
          },
          lng: {
            type: Number,
          },
        },
      },
    ],
    busId: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Bus",
    },
    tripId: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Trip",
    },

    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Operator = mongoose.model("Operator", operatorSchema);
module.exports = Operator;
