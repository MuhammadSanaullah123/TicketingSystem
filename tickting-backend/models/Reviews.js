const mongoose = require('mongoose')

const ReviewSchema = new mongoose.Schema({
    busId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Bus"
    },
    operatorId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Operator'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    rating: {
        type: Number
    },
    review: {
        type: String
    },
    isHidden: {
        type: Boolean,
        default: false
    } 
}, {
    timestamps: true
})

const Reviews = mongoose.model("Reviews", ReviewSchema)
module.exports = Reviews;