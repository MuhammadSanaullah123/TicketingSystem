const Reviews = require('../models/Reviews')
const Operator = require('../models/Operator')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')
const Bus = require('../models/Bus')
const moment = require('moment')

exports.getReviews = catchAsync(async (req, res, next) => {
    const reviews = await Reviews.find({ busId: req.params.id, isHidden: false }).populate('busId').populate('userId').populate('operatorId')
    res.json({ success: true, reviews })
})

exports.addReviews = catchAsync(async (req, res, next) => {
    const { rating, review } = req.body;
    const bus = await Bus.findById(req.params.id);
    if (!bus) {
        return next(
            new AppError('Invalid Bus Id Provided', 403)
        )
    }
    let diff = moment().diff(moment(bus.date, 'DD-MM-YYYY'), "hours")
    // console.log(diff)
    if (diff < 0) {
        return next(
            new AppError('You can review once the journey is over')
        )
    }
    const operator = await Operator.findOne({ userId: req.user.id })
    const newReview = new Reviews({
        busId: req.params.id,
        userId: req.user.id,
        operatorId: operator.id,
        review,
        rating
    })
    const addedReview = await newReview.save();
    bus.rating.push(addedReview.id)
    await bus.save()
    res.json({ success: true, message: "Review Added Successfully", review: addedReview })
})

exports.getOperatorReviews = catchAsync(async (req, res, next) => {
    const reviews = await Reviews.find({ operatorId: req.params.id }).populate({
        path: 'busId',
        populate: { path: 'operatorId' }
    }).populate('userId')
    if (reviews.length == 0) return res.json({ message: "No Reviews Found" })
    res.json({ success: true, reviews })
})

exports.getCustomerReviews = catchAsync(async (req, res, next) => {
    let reviews = await Reviews.find({ userId: req.user.id }).populate('busId').populate('operatorId').populate('userId')
    res.json({ success: true, reviews })
})