const mongoose = require('mongoose')

const BusSchema = new mongoose.Schema({
    operatorId: {
       type: String,
       required: true
    },
    busNumber: {
        type: String,
        required: true
    },
    seatSelection: {
        type: Boolean,
        default: true
    },
    busType: {
        type: String,
    },
    totalSeats: {
        type: Number,
        required: true
    },
    occupiedSeats: {
        type: [Number],
    },
    availableSeats: {
        type: Number
    },
    disabledSeats: {
        type: [Number],
    },
    baggage: {
        type: String
    },
    image: {
        type: Object
    },
    status: {
        type: String
    },
    rating: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Reviews'
    },
    bus_facilities: {
        type:Array
    }
}, {
    timestamps: true
})

const Bus = mongoose.model("Bus", BusSchema)
module.exports = Bus;