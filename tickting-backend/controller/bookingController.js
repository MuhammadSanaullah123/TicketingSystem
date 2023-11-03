const Booking = require("../models/Bookings");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Bus = require("../models/Bus");
const moment = require("moment");
const generateUniqueId = require("generate-unique-id");
const User = require("../models/User");
const Trip = require("../models/Trip");

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

exports.assignSeats = catchAsync(async (req, res, next) => {
  const { seats } = req.body;
  const booking = await Booking.findById(req.params.id);
  const busDetails = await Bus.findById(booking.busId);
  let isSeatBooked;
  for (let i = 0; i < seats.length; i++) {
    isSeatBooked = busDetails.occupiedSeats.includes(seats[i]);
    if (isSeatBooked) {
      return next(new AppError("Seat Is Already Occupied"));
    }
  }
  for (let i = 0; i < seats.length; i++) {
    if (seats[i] > busDetails.totalSeats) {
      return next(new AppError("Seat Not Found"));
    }
  }
  if (seats.length === 0) {
    return next(new AppError("You Must Select Atleast One Seat."));
  }
  booking.seats = seats;
  busDetails.occupiedSeats = busDetails.occupiedSeats.concat(seats);
  busDetails.occupiedSeats.sort(function (a, b) {
    return a - b;
  });
  await busDetails.save();
  const result = await booking.save();
  res.json({
    success: true,
    message: "Seats Assigned Successfully",
    bookingDetails: result,
  });
});

exports.getSeats = catchAsync(async (req, res, next) => {
  let { tripId, seats, phone, noOfSeats, email, price, passengerDetails } =
    req.body;

  const tripDetails = await Trip.findById(tripId);
  const busDetails = await Bus.findById(tripDetails.busId);

  if (busDetails.seatSelection) {
    if (seats.length !== parseInt(noOfSeats))
      return next(new AppError("Enter valid number of seats", 400));

    for (let i = 0; i < seats.length; ++i) {
      if (seats[i] < 0 || seats[i] > busDetails.totalSeats)
        return next(new AppError("Enter a valid seat number", 400));

      let isSeatBooked = busDetails.occupiedSeats.includes(seats[i]);
      if (busDetails.disabledSeats.includes(seats[i]))
        return next(new AppError("Selected seat is disabled", 400));

      console.log(isSeatBooked);
      if (isSeatBooked) {
        return next(new AppError("Seat Is Already Occupied"));
      }
    }
    for (let i = 0; i < seats.length; i++) {
      if (seats[i] > busDetails.totalSeats) {
        return next(new AppError("Seat Not Found"));
      }
    }
    if (seats.length === 0) {
      return next(new AppError("You Must Select Atleast One Seat."));
    }
  }
  if (typeof passengerDetails === typeof "String") {
    passengerDetails = JSON.parse(passengerDetails);
  }

  var file = req.files;
  console.log(file);
  // for (let i = 0; i < file.length; i++) {
  //     passengerDetails[i].passport = file[i].filename;
  // }
  if (!tripDetails.busId) {
    return next(new AppError("Please Provide The Bus Id."));
  }
  if (noOfSeats == 0 && !noOfSeats) {
    return next(new AppError("You Must Provide Atleast One Seat."));
  }
  // if (passengerDetails.length < noOfSeats) {
  //     return next(
  //         new AppError("Fill The Details of All The Passengers.")
  //     )
  // }
  const bookings = new Booking({
    trip: tripId,
    userId: req.user.id,
    seats,
    bookingId: generateUniqueId({
      length: 8,
      useLetters: false,
    }),
    operatorId: busDetails.operatorId,
    noOfSeats,
    price,
    phone,
    email,
    passengerDetails,
  });
  busDetails.occupiedSeats = [...busDetails.occupiedSeats, ...seats];
  busDetails.availableSeats =
    busDetails.totalSeats - busDetails.occupiedSeats.length - noOfSeats;

  await busDetails.save();

  const result = await bookings.save();

  res.json(result);
});

exports.bookSeatsWithoutLogin = catchAsync(async (req, res, next) => {
  let {
    tripId,
    busId,
    phone,
    noOfSeats,
    email, 
    price,
    passengerDetails,
    additionalDetails,
  } = req.body;
  console.log(req.body, typeof req.body.seats);
  const busDetails = await Bus.findById(busId);
  // let seats = busDetails.seatSelection ? JSON.parse(req.body.seats) || [] : [];
  let seats = busDetails.seatSelection ? req.body.seats || [] : [];

  // var arr = req.body.seats.split('');
  var arr = JSON.parse("[" + req.body.seats + "]");

  if (typeof req.body.seats === "string") {
    console.log("itsString");
  }
  let checkVariable = Array.isArray(arr);
  // let checkString=String.isString(req.body.seats );
  // let checkVariable=Array.isArray(req.body.seats );

  console.log("receivedData?.seats", checkVariable);

  // console.log("req.body.seats",req.body.seats)

  seats = arr.filter(onlyUnique);
  console.log(seats, "SEATS");

  console.log(busDetails.occupiedSeats, seats.length, "OCC. SEATS");

  if (busDetails.seatSelection) {
    if (seats.length !== parseInt(noOfSeats))
      return next(new AppError("Enter valid number of seats", 400));
    for (let i = 0; i < seats.length; ++i) {
      if (seats[i] < 0 || seats[i] > busDetails.totalSeats)
        return next(new AppError("Enter a valid seat number", 400));
      let isSeatBooked = busDetails.occupiedSeats.includes(seats[i]);
      if (busDetails.disabledSeats.includes(seats[i]))
        return next(new AppError("Selected seat is disabled", 400));
      console.log(isSeatBooked);
      if (isSeatBooked) {
        return next(new AppError("Seat Is Already Occupied"));
      }
    }
    for (let i = 0; i < seats.length; i++) {
      if (seats[i] > busDetails.totalSeats) {
        return next(new AppError("Seat Not Found"));
      }
    }
    if (seats.length === 0) {
      return next(new AppError("You Must Select Atleast One Seat."));
    }
  }
  if (typeof passengerDetails === typeof "String") {
    passengerDetails = JSON.parse(passengerDetails);
  }
  var file = req.files;
  console.log(file);
  for (let i = 0; i < file.length; i++) {
    passengerDetails[i].passport = file[i].filename;
  }
  console.log(passengerDetails);

  if (!busId) {
    return next(new AppError("Please Provide The Bus Id."));
  }
  if (noOfSeats == 0 && !noOfSeats) {
    return next(new AppError("You Must Provide Atleast One Seat."));
  }
  // if (passengerDetails.length < noOfSeats) {
  //     return next(
  //         new AppError("Fill The Details of All The Passengers.")
  //     )
  // }

  const bookings = new Booking({
    trip: tripId,
    busId,
    seats,
    bookingId: generateUniqueId({
      length: 8,
      useLetters: false,
    }),
    operatorId: busDetails.operatorId,
    noOfSeats,
    price,
    phone,
    email,
    passengerDetails,
    additionalDetails,
  });
  busDetails.occupiedSeats = [...busDetails.occupiedSeats, ...seats];
  busDetails.availableSeats =
    busDetails.totalSeats - busDetails.occupiedSeats.length - noOfSeats;
  await busDetails.save();
  const result = await bookings.save();
  res.json({
    success: true,
    message: "Booking Details Registered",
    bookingDetails: result,
  });
});

exports.verifySeats = catchAsync(async (req, res, next) => {
  // WebHooks Code will be Implemented here
});

exports.myBookings = catchAsync(async (req, res, next) => {
  console.log(req.user.id._id);
  const userId = req.user;
  const bookings = await Booking.find();
  console.log(bookings);

  const pastBookings = bookings.filter(async (b) => {
    console.log("b", b);
    const allBookings = await b.populate("trip");
    console.log("allBookings", allBookings);
    const currentBus = allBookings.trip.busId;

    let diff = moment().diff(moment(currentBus.createdAt), "days");
    if (diff > 0) return b;
  });

  const upcomingBookings = bookings.filter(async (b) => {
    const allBookings = await b.populate("trip");
    const currentBus = b.trip.busId;

    let diff = moment().diff(moment(currentBus.createdAt), "days");
    if (diff < 0) return b;
  });

  res.json({ success: true, pastBookings, upcomingBookings });
});

exports.getBooking = catchAsync(async (req, res, next) => {
  const booking = await Booking.findById(req.params.id)
    .populate("busId")
    .populate("operatorId");
  if (!booking) {
    return next(new AppError("Invalid Booking Id Provided", 404));
  }
  res.json(booking);
});

exports.getParticularBooking = catchAsync(async (req, res, next) => {
  const booking = await Booking.findOne({ bookingId: req.params.id });
  if (!booking) {
    return next(new AppError("Invalid Booking id Provided", 403));
  }
  res.json({ success: true, booking });
});

exports.cancelBooking = catchAsync(async (req, res, next) => {
  let booking = await Booking.findById(req.params.id);
  booking.bookingStatus = "cancelled";
  let bus = await Bus.findById(booking.busId);
  if (booking.seats.length > 0) {
    for (let i = 0; i < booking.seats.length; i++) {
      bus.occupiedSeats = bus.occupiedSeats.filter(
        (b) => b != booking.seats[i]
      );
    }
  }
  await bus.save();
  await booking.save();
  res.json({ success: true, message: "Booking Cancelled Successfully" });
});

exports.updateBooking = catchAsync(async (req, res, next) => {
  const updatedBooking = await Booking.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  if (!updatedBooking) {
    return next(new AppError("Invalid Booking id Provided", 403));
  }
  res.json({ success: true, updatedBooking });
});
