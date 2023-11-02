const mongoose = require('mongoose')

const CouponSchema = new mongoose.Schema({
    operatorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Operator'
    },
    image: {
        type: String
    },
    name: {
        type: String
    },
    code: {
        type: String
    },
    validity: {
        type: String
    },
    discount: {
        type: String
    },
    busType: {
        type: String
    }
}, {
    timestamps: true
})

const Coupon = mongoose.model("Coupon", CouponSchema)
module.exports = Coupon