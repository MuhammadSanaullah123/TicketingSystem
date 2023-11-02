const Bus = require("../models/Bus");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Operator = require("../models/Operator");
const User = require("../models/User");

exports.getBus = catchAsync(async (req, res, next) => {
  const bus = await Bus.find(req.query)
    .populate("operatorId")
    .populate("rating");
  if (bus.length == 0) {
    return next(new AppError("No Bus Found", 404));
  }
  const numberOfBuses = bus.length;
  res.json({ success: true, numberOfBuses, bus });
});

// exports.addBus = catchAsync(async (req, res, next) => {
//     let { operatorId, busNumber, date, occupiedSeats, price, busType, totalSeats, baggage, departureTime, arrivalTime, status, routeTo, routeFrom, rating, bus_facilities, seatSelection } = req.body

//     let user = await User.findById(req.user.id)
//     if (operatorId) {
//         if (user.role !== 'admin') {
//             return next(
//                 new AppError('Unauthorized', 403)
//             )
//         }
//     }
//     if (!busNumber) {
//         return next(
//             new AppError('Please provide The Bus Number', 400)
//         )
//     }

//     if (!occupiedSeats) {
//         occupiedSeats = []
//     }

//     if (!totalSeats) {
//         return next(
//             new AppError('Please Provide the total Number of Seats')
//         )
//     }

//     if (!price) {
//         return next(
//             new AppError('Please Provide the Fare')
//         )
//     }

//     if (!(arrivalTime && departureTime)) {
//         return next(
//             new AppError('Provide the Arrival And Departure Time.')
//         )
//     }

//     if (!(routeFrom && routeTo)) {
//         return next(
//             new AppError('Provide the Route For The Journey')
//         )
//     }

//     let operator = await Operator.findOne({ userId: req.user.id })
//     if (operatorId) {
//         operator = await Operator.findById(operatorId);
//     }
//     if (!operator) {
//         return next(
//             new AppError('Invalid Operator', 403)
//         )
//     }
//     const bus = new Bus({
//         operatorId: operator.id,
//         busNumber,
//         busType,
//         totalSeats,
//         seatSelection,
//         departureTime,
//         status,
//         arrivalTime,
//         baggage,
//         image: req.file.path,
//         price,
//         occupiedSeats,
//         availableSeats: totalSeats - occupiedSeats.length,
//         date,
//         routeTo,
//         routeFrom,
//         rating,
//         bus_facilities: JSON.parse(bus_facilities)
//     })
//     const addedBus = await bus.save();
//     operator.busId.push(addedBus.id);
//     console.log(operator)
//     await operator.save()
//     res.json({ success: true, message: "Bus Added Succesfully", bus: addedBus })
// })

exports.addBus = catchAsync(async (req, res, next) => {
  let {
    operatorId,
    busNumber,
    occupiedSeats,
    busType,
    totalSeats,
    baggage,
    status,
    rating,
    bus_facilities,
    seatSelection,
    image,
  } = req.body;

  let user = await User.findById(req.user.id);
  if (!operatorId) {
    let operator_temp = await Operator.findOne({ userId: user._id });
    console.log("operator_temp");
    console.log(operator_temp);
    operatorId = operator_temp._id;
  }

  console.log("USER");
  console.log(user);
  console.log(req.user.id);
  if (!busNumber) {
    console.log(req.body);
    return next(new AppError("Please provide The Bus Number", 400));
  }

  if (!occupiedSeats) {
    occupiedSeats = [];
  }

  if (!totalSeats) {
    return next(new AppError("Please Provide the total Number of Seats"));
  }

  let operator = await Operator.findOne({ userId: req.user.id });

  if (operatorId) {
    operator = await Operator.findById(operatorId);
  }

  if (!operator) {
    return next(new AppError("Invalid Operator", 403));
  }

  const bus = new Bus({
    operatorId,
    busNumber,
    busType,
    totalSeats,
    seatSelection,
    status,
    baggage,
    image,
    occupiedSeats,
    availableSeats: totalSeats - occupiedSeats.length,
    rating,
    bus_facilities: bus_facilities,
  });

  const addedBus = await bus.save();

  operator.busId.push(addedBus.id);
  console.log(operator);

  await operator.save();

  res.json({ success: true, message: "Bus Added Succesfully", bus: addedBus });
});

exports.updateBus = catchAsync(async (req, res, next) => {
  const {
    operatorId,
    busType,
    busNumber,
    totalSeats,
    baggage,
    bus_facilities,
  } = req.body;

  let data = {
    operatorId,
    busType,
    busNumber,
    totalSeats,
    baggage,
    bus_facilities,
  };
  console.log(data.totalSeats);
  if (req.file) {
    console.log("req.file");
    data.image = req.file.path;
  }

  const updatedBus = await Bus.findByIdAndUpdate(req.params.id, data, {
    new: true,
  });
  console.log(updatedBus);

  if (!updatedBus) {
    return next(new AppError("Invalid Bus Id Provided", 404));
  }

  res.json({ success: true, message: "Bus Updated Succesfully", updatedBus });
});

exports.removeBus = catchAsync(async (req, res, next) => {
  const removedBus = await Bus.findByIdAndRemove(req.params.id);
  if (!removedBus) {
    return next(new AppError("Invalid Bus Id Provided"));
  }
  res.json({ success: true, message: "Bus removed Succesfully", removedBus });
});

exports.getBusDetails = catchAsync(async (req, res, next) => {
  const busDetails = await Bus.findById(req.params.id).populate("operatorId");
  if (!busDetails) {
    return next(new AppError("Invalid Bus Id Provided"));
  }
  res.json({ success: true, busDetails });
});

exports.disableSeats = catchAsync(async (req, res, next) => {
  const { busId, seats } = req.body;

  const bus = await Bus.findById(busId);

  if (!bus) {
    return next(new AppError("Invalid Bus Id Provided"));
  }
  if (!seats) {
    return next(
      new AppError(
        "Please Provide Atleast One Seat to Perform Disable Operation"
      )
    );
  }
  for (let i = 0; i < seats.length; i++) {
    if (bus.occupiedSeats.includes(seats[i])) {
      return next(new AppError("Occupied Seat Can't Be Disabled"));
    }
  }

  bus.disabledSeats = bus.disabledSeats.concat(seats);
  bus.occupiedSeats.sort(function (a, b) {
    return a - b;
  });

  bus.availableSeats = bus.totalSeats - bus.occupiedSeats.length;

  await bus.save();

  res.json({ success: true, message: "Seats Disabled Successfully" });
});
