const User = require('../models/User')
const bcrypt = require('bcrypt');
const AppError = require('../utils/appError')
const createToken = require('../utils/createToken');
const generateUniqueId = require("generate-unique-id");
const catchAsync = require('../utils/catchAsync');
const Operator = require('../models/Operator');

exports.loginUser = catchAsync(async (req, res, next) => {
    let success = false;
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    
    if (!user) {
        return next(
            new AppError('User Not Exists', 404)
        )
    }
    const passCompare = await bcrypt.compare(password, user.password)


    if (!passCompare) {
        return next(
            new AppError('Try Logging In with Correct Credentials', 404)
        )
    }
    success = true;
    const authToken = createToken(user.id)
    res.cookie('auth', authToken)
    if (user.role === 'operator') {
        const operator = await Operator.findOne({ userId: user.id })
        return res.status(200).json({ success, authToken, operator, user })
    }
    res.status(200).json({ success, authToken, user });
})

exports.createUser = catchAsync(async (req, res, next) => {
    const { username, phone, email, password, role, civilianId } = req.body;
    const checkMail = await User.find({ email })
    if (checkMail.length != 0) {
        return next(
            new AppError('Email Already Exists', 400)
        )
    }
    if (!(email && password)) {
        return next(
            new AppError('Please Provide Email and Password')
        )
    }
    let customerId = generateUniqueId({
        length: 8,
        useLetters: false,
    })

    const salt = await bcrypt.genSalt();
    const hashPass = await bcrypt.hash(password, salt);
    const newUser = new User({
        username,
        customerId,
        email,
        role,
        civilianId,
        phone,
        password: hashPass
    })
    const user = await newUser.save();
    res.status(201).json({ success: true, user, message: "Succesfully Created" });
})

exports.logoutUser = catchAsync((req, res, next) => {
    res.clearCookie('auth')
    res.json({ success: true, message: 'Logging Out' })
})

exports.getUser = catchAsync(async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id).sort({ createdAt: -1 }).populate('walletId').select("-password")
        if (!user) {
            return next(
                new AppError('User Not Found')
            )
        }
        
        res.json({ success: true, user })    
    } catch (error) {
        console.log(error)
    }
    
})

exports.removeUser = catchAsync(async (req, res, next) => {
    const removedUser = await User.findByIdAndRemove(req.params.id)
    if (!removedUser) {
        return next(
            new AppError('Invalid User Id Provided')
        )
    }
    res.json({ success: true, message: "User removed Succesfully", removedUser })
})

exports.updateUser = catchAsync(async (req, res, next) => {
    const { username, phone, civilianId, address } = req.body;
    const data = {
        username, phone, civilianId, address
    }
    if (req.file) {
        data.image = req.file.path
    }
    const updatedUser = await User.findByIdAndUpdate(req.params.id, data, { new: true })
    if (!updatedUser) {
        return next(
            new AppError('Invalid User Id Provided')
        )
    }
    res.json({ success: true, message: "User Updated Succesfully", updatedUser })
})

exports.setCookie = catchAsync(async (req, res, next) => {
    const token = createToken(req.user._id)
    res.cookie('auth', token)
    res.redirect("/api/auth/getUser")
})