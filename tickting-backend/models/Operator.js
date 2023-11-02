const mongoose = require('mongoose')

const operatorSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    operatorId: {
        type: String
    },
    operatorName: {
        type: String
    },
    name: {
        type: String,
        // required: true
    },
    address: {
        type: String
    },
    busId: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Bus"
    },
    tripId: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Trip"
    },
    
    isVerified: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

const Operator = mongoose.model("Operator", operatorSchema)
module.exports = Operator;