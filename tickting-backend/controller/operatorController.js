const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Operator = require("../models/Operator");
const User = require("../models/User");
const moment = require("moment");
const Booking = require("../models/Bookings");
const Coupon = require("../models/Coupons");
const bcrypt = require("bcrypt");
const createToken = require("../utils/createToken");
const generateUniqueId = require("generate-unique-id");

exports.getOperatorDetails = catchAsync(async (req, res, next) => {
  const operator = await Operator.findById(req.params.id)
    .populate("busId")
    .populate("userId")
    .select("-password");
  if (!operator) {
    return next(new AppError("Operator Not Found", 404));
  }
  res.json(operator);
});

exports.setOperatorDetails = catchAsync(async (req, res, next) => {
  const { username, email, password, operatorName, address, contact } =
    req.body;
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
    email,
    role: "operator",
    password: hashPass,
  });
  const users = await newUser.save();
  let user = await User.findById(users.id);
  const newOperator = new Operator({
    userId: users.id,
    operatorId: generateUniqueId({
      length: 8,
      useLetters: false,
    }),
    address,
    name: operatorName,
    operatorName: username,
    contact,
  });
  user.role = "operator";
  await user.save();
  const operatorr = await newOperator.save();
  res.json({
    status: true,
    message: "Operators Details Registered Succesfully.",
    operator: operatorr,
  });
});

exports.loginOperator = catchAsync(async (req, res, next) => {
  let success = false;
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  console.log("USSSSEEERRRssss");
  console.log(user);

  if (!user) {
    return next(new AppError("User Not Exists", 404));
  }
  const passCompare = await bcrypt.compare(password, user.password);
  console.log("PASSCOMPRe");
  console.log(passCompare);
  if (!passCompare) {
    return next(new AppError("Try Logging In with Correct Credentials", 404));
  }

  const operator = await Operator.findOne({ userId: user._id });
  console.log("OPPPPEEEERAAATTTOOORRR");
  console.log(operator);
  if (operator.isVerified === false) {
    return res.json({ success: false, message: "Operator Is Not Verified" });
  }
  success = true;
  const authToken = createToken(user.id);
  res.cookie("auth", authToken);
  res.status(200).json({ success, authToken, operator });
});

exports.getRecentBookings = catchAsync(async (req, res, next) => {
  const { busType, date, routeFrom, routeTo } = req.query;
  const operator = await Operator.findOne({ userId: req.user.id });
  let queryObject = { operatorId: operator.id };
  const bookings = await Booking.find(queryObject)
    .populate("busId")
    .populate("userId")
    .populate("operatorId");
  res.json({ message: "Success", recentBookings: bookings.reverse() });
});

exports.getSalesDetails = catchAsync(async (req, res, next) => {
  const operator = await Operator.findOne({ userId: req.user.id });
  if (!operator) {
    return next(new AppError("Try Logging In With Correct Operator Id "));
  }
  const bookings = await Booking.find({ operatorId: operator.id })
    .populate("busId")
    .populate("userId");
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

exports.getCustomerDetails = catchAsync(async (req, res, next) => {
  const { civilianId, bookingId, username, customerId } = req.query;
  let queryObject = {};
  let bookingQuery = {};
  if (civilianId) queryObject.civilianId = civilianId;
  if (username) queryObject.username = username;
  if (bookingId) bookingQuery.bookingId = bookingId;
  if (customerId) queryObject.customerId = customerId;

  // let customers = []
  const operator = await Operator.findOne({ userId: req.user.id });
  console.log(operator);
  const bookings = await Booking.find({
    operatorId: operator.id,
    ...bookingQuery,
  });
  let ids = bookings.map((b) => b.userId);
  const customers = await User.find({ _id: { $in: ids }, ...queryObject });
  res.json({ customers });
});

exports.getBookingDetails = catchAsync(async (req, res, next) => {
  const { phone, status, days } = req.query;
  const operator = await Operator.findOne({ userId: req.user.id });
  const bookings = await Booking.find({ operatorId: operator.id })
    .populate("busId")
    .populate("userId");
  let startDate = moment(Date.now()).subtract(days, "days");
  let booking = [];
  if (phone && !status && !days) {
    booking = bookings.filter((p) => {
      if (p.userId.phone == phone) return p;
    });
  }
  if (phone && status && !days) {
    booking = bookings.filter((p) => {
      if (p.userId.phone == phone && p.busId.status == status) return p;
    });
  }
  if (phone && status && days) {
    booking = bookings.filter((p) => {
      if (
        p.userId.phone == phone &&
        p.busId.status == status &&
        startDate.diff(moment(p.createdAt), "hours") < 0
      )
        return p;
    });
  }
  if (phone && !status && days) {
    booking = bookings.filter((p) => {
      if (
        p.userId.phone == phone &&
        startDate.diff(moment(p.createdAt), "hours") < 0
      )
        return p;
    });
  }
  if (!phone && !status && days) {
    booking = bookings.filter((p) => {
      if (startDate.diff(moment(p.createdAt), "hours") < 0) return p;
    });
  }
  if (!phone && status && !days) {
    booking = bookings.filter((p) => {
      if (p.busId.status == status) return p;
    });
  }
  if (!phone && !status && !days) {
    booking = bookings;
  }
  res.json({ booking, length: booking.length });
});

exports.addBusStations = catchAsync(async (req, res, next) => {
  const { images, locations } = req.body;
  console.log(images);
  console.log(locations);
  const user = await User.findById(req.user.id);
  const operator = await Operator.findOne({ userId: user.id });
  console.log("OPERATOR");
  console.log(operator);
  operator.busStations.push({
    images: images,
    location: {
      lat: locations.lat,
      lng: locations.lng,
    },
  });
  const updatedOperator = await operator.save();
  console.log("updatedOperator");
  console.log(updatedOperator);
  res.json({
    success: true,
    message: "Bus Station Added Succesfully",
    coupon: updatedOperator,
  });
});

exports.removeBusStations = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  const operator = await Operator.findOne({ userId: user.id });
  console.log("OPERATOR");
  console.log(operator);
  operator.busStations = operator.busStations.filter(
    (station) => station._id.toString() !== req.params.id
  );

  const updatedOperator = await operator.save();
  console.log("updatedOperator");
  console.log(updatedOperator);
  res.json({
    success: true,
    message: "Bus Station Removed Succesfully",
    coupon: updatedOperator,
  });
});

exports.addCoupon = catchAsync(async (req, res, next) => {
  const { name, code, validity, discount, busType } = req.body;
  if (!(name && code && discount)) {
    return next(new AppError("Provide the Necessary Fields", 400));
  }
  const user = await User.findById(req.user.id);
  const operator = await Operator.findOne({ userId: user.id });
  const newCoupon = new Coupon({
    operatorId: operator.id,
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
  const user = await User.findById(req.user.id);
  const operator = await Operator.findOne({ userId: user.id });
  const coupons = await Coupon.find({ operatorId: operator.id });
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
  const { name, code, validity, discount, busType } = req.body;
  const updatedObject = {
    name,
    code,
    validity,
    discount,
    busType,
    image: req.file.path,
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

exports.getBuses = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  const operator = await Operator.findOne({ userId: user.id }).populate(
    "busId"
  );
  if (!operator) {
    return next(new AppError("Invalid Operator", 400));
  }
  const buses = operator.busId;
  res.json({ buses });
});
