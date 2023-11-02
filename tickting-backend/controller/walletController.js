const Wallet = require('../models/Wallet')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError');
const User = require('../models/User');

exports.getWalletDetails = catchAsync(async (req, res, next) => {
    const walletDetails = await Wallet.findOne({ userId: req.user.id });
    res.json({ success: true, walletDetails })
})

exports.addWallet = catchAsync(async (req, res, next) => {
    const checkWallet = await Wallet.find({ userId: req.user.id })
    if (checkWallet.length > 0) {
        return next(
            new AppError("Wallet Already Exists", 400)
        )
    }
    const wallet = new Wallet({
        userId: req.user.id
    })
    const newWallet = await wallet.save()
    const user = await User.findById(req.user.id);
    user.walletId = newWallet.id;
    await user.save()
    res.json({ success: true, messsage: "Wallet Added Succesfully" })
})

exports.addMoney = catchAsync(async (req, res, next) => {
    const { amount } = req.body
    const wallet = await Wallet.findOne({ userId: req.user.id });
    wallet.balance += Number(amount)
    walletDetails = await wallet.save()
    res.json({ success: true, walletDetails })
})
