const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const User = require("../models/User");
const Bus = require("../models/Bus");
const moment = require("moment");
const Booking = require("../models/Bookings");
const Coupon = require("../models/Coupons");
const bcrypt = require("bcrypt");
const createToken = require("../utils/createToken");
const Operator = require("../models/Operator");
const Reviews = require("../models/Reviews");

exports.getAdminDetails = catchAsync(async (req, res, next) => {
  const admin = await User.findById(req.params.id).select("-password");
  if (!admin) {
    return next(new AppError("Admin Not Found", 404));
  }
  res.json({ success: true, admin });
});

exports.setAdminDetails = catchAsync(async (req, res, next) => {
  const { username, phone, email, password, civilianId } = req.body;
  const checkMail = await User.find({ email });
  if (checkMail.length != 0) {
    return next(new AppError("Email Already Exists", 400));
  }
  if (!(email && password)) {
    return next(new AppError("Please Provide Email and Password"));
  }
  const salt = await bcrypt.genSalt();
  const hashPass = await bcrypt.hash(password, salt);
  const newUser = new User({
    username,
    email,
    role: "admin",
    civilianId,
    phone,
    password: hashPass,
  });
  await newUser.save();
  res.json({ status: true, message: "Admin Details Registered Succesfully." });
});

exports.loginAdmin = catchAsync(async (req, res, next) => {
  let success = false;

  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return next(new AppError("User does not exists", 404));
  }

  const passCompare = await bcrypt.compare(password, user.password);

  if (!passCompare) {
    return next(new AppError("Try Logging In with Correct Credentials", 404));
  }

  success = true;

  const authToken = createToken(user);

  res.status(200).json({ success, authToken, user });
});

exports.getBuses = catchAsync(async (req, res, next) => {
  const Buses = await Bus.find();
  res.json({ success: true, Buses });
});

exports.getCustomer = catchAsync(async (req, res, next) => {
  const customers = await User.find({ role: "customer" }).sort({
    createdAt: -1,
  });

  res.json(customers);
});

exports.getOperatorList = catchAsync(async (req, res, next) => {
  let queryObject = {};
  const operators = await Operator.find(queryObject).populate("busId");
  res.json({ success: true, operators });
});

exports.getBookings = catchAsync(async (req, res, next) => {
  const { operatorName, status, days } = req.query;
  const bookings = await Booking.find()
    .populate("busId")
    .populate("userId")
    .populate("operatorId");
  let startDate = moment(Date.now()).subtract(days, "days");
  let booking = [];
  if (operatorName && !status && !days) {
    booking = bookings.filter((p) => {
      if (p.name == operatorName) return p;
    });
  }
  if (operatorName && status && !days) {
    booking = bookings.filter((p) => {
      if (p.name == operatorName && p.busId.status == status) return p;
    });
  }
  if (operatorName && status && days) {
    booking = bookings.filter((p) => {
      if (
        p.name == operatorName &&
        p.busId.status == status &&
        startDate.diff(moment(p.createdAt), "hours") < 0
      )
        return p;
    });
  }
  if (operatorName && !status && days) {
    booking = bookings.filter((p) => {
      if (
        p.name == operatorName &&
        startDate.diff(moment(p.createdAt), "hours") < 0
      )
        return p;
    });
  }
  if (!operatorName && !status && days) {
    booking = bookings.filter((p) => {
      if (startDate.diff(moment(p.createdAt), "hours") < 0) return p;
    });
  }
  if (!operatorName && status && !days) {
    booking = bookings.filter((p) => {
      if (p.busId.status == status) return p;
    });
  }
  if (!operatorName && !status && !days) {
    booking = bookings;
  }
  res.json({ booking, length: booking.length });
});

exports.addCoupon = catchAsync(async (req, res, next) => {
  const { name, code, validity, discount, busType } = req.body;
  if (!(name && code && discount)) {
    return next(new AppError("Provide the Necessary Fields", 400));
  }
  const newCoupon = new Coupon({
    name,
    image: req.file.path,
    code,
    validity,
    discount,
    busType,
  });
  const savedCoupon = await newCoupon.save();
  res.json({
    success: true,
    message: "Coupon Created Succesfully",
    coupon: savedCoupon,
  });
});

exports.getCoupon = catchAsync(async (req, res, next) => {
  const coupons = await Coupon.find();
  res.json({ success: true, coupons });
});

exports.deleteCoupon = catchAsync(async (req, res, next) => {
  const deletedCoupon = await Coupon.findByIdAndRemove(req.params.id);
  if (!deletedCoupon) {
    return next(new AppError("Invalid Coupon Id Provided", 400));
  }
  res.json({ success: true, deletedCoupon });
});

exports.updateCoupon = catchAsync(async (req, res, next) => {
  const { name, code, validity, discount, busType, image } = req.body;
  console.log(req.body);
  const updatedObject = {
    name,
    code,
    validity,
    discount,
    busType,
    image: image,
  };
  const updatedCoupon = await Coupon.findByIdAndUpdate(
    req.params.id,
    updatedObject,
    { new: true }
  );
  if (!updatedCoupon) {
    return next(new AppError("Invalid Coupon Id Provided", 400));
  }
  res.json({ success: true, updatedCoupon });
});

exports.getRecentBookings = catchAsync(async (req, res, next) => {
  const { busType, date, routeFrom, routeTo } = req.query;

  // if (bus)
  const bookings = await Booking.find().populate("busId").populate("userId");
  // for (let i = 0; i < bookings.length; i++) {
  //     if (moment(bookings[i].createdAt).day == moment(Date.now()).day) {
  //         todaySale += (+bookings[i].price)
  //     }
  // }
  res.json({ message: "Success", recentBookings: bookings.reverse() });
});

exports.getSalesDetails = catchAsync(async (req, res, next) => {
  const bookings = await Booking.find().populate("busId").populate("userId");
  if (bookings.length == 0) {
    return res.json({ message: "No Bookings Found" });
  }
  let todaySale = 0;
  let monthSale = 0;
  let totalSale = 0;
  for (let i = 0; i < bookings.length; i++) {
    totalSale += Number(bookings[i].price);
    if (moment(bookings[i].createdAt).day() == moment(Date.now()).day()) {
      todaySale += Number(bookings[i].price);
    }
    if (moment(bookings[i].createdAt).month() == moment(Date.now()).month()) {
      monthSale += Number(bookings[i].price);
    }
  }
  res.json({ todaySale, monthSale, totalSale });
});

exports.verifyOperator = catchAsync(async (req, res, next) => {
  let operator = await Operator.findById(req.params.id);
  if (!operator) return next(new AppError("Invalid Operator Id Provided", 404));
  operator.isVerified = true;
  const verifiedOperator = await operator.save();
  res.json({ success: true, operator: verifiedOperator });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const { username, phone, role, civilianId, address } = req.body;
  const data = {
    username,
    phone,
    role,
    civilianId,
    address,
  };
  const updatedUser = await User.findByIdAndUpdate(req.params.id, data, {
    new: true,
  });
  if (!updatedUser) return res.json({ message: "Invalid Userid Provided" });
  res.json({ success: true, updatedUser });
});

exports.updateOperator = catchAsync(async (req, res, next) => {
  const { operatorName, name, address, contact } = req.body;
  const data = {
    operatorName,
    name,
    address,
    contact,
  };
  let user = await User.findById(req.user.id);
  let operator = await Operator.findOne({ userId: req.user.id });
  if (user.role !== "admin" && operator.id !== req.params.id) {
    return next(new AppError("You are not Authorized", 403));
  }
  const updatedOperator = await Operator.findByIdAndUpdate(
    req.params.id,
    data,
    { new: true }
  );
  if (!updatedOperator)
    return res.json({ message: "Invalid Operator Id Provided" });
  res.json({ success: true, updatedOperator });
});

exports.toggleHideReview = catchAsync(async (req, res, next) => {
  let review = await Reviews.findById(req.params.id);
  if (!review) return res.json({ message: "Invalid Review Id Provided" });
  if (review.isHidden) {
    review.isHidden = false;
  } else {
    review.isHidden = true;
  }
  let hiddenReview = await review.save();
  res.json({ success: true, hiddenReview });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndRemove(req.params.id);
  if (!user) {
    return next(new AppError("Invalid User Id Provided", 403));
  }
  if (user.role === "operator") {
    const operator = await Operator.findOneAndRemove({ userId: req.params.id });
  }
  res.json({ success: true, message: "User Removed Successfully" });
});

exports.getOperators = catchAsync(async (req, res, next) => {
  const operators = await Operator.find();
  console.log("OPERAATORES");
  console.log(operators);
  res.json({ operators });
});
