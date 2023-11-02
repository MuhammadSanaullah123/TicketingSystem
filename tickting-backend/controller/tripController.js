const Trip = require("../models/Trip");
const Bus = require("../models/Bus");
const Operator = require("../models/Operator");
const User = require("../models/User");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const cron = require("node-cron");
exports.getTrip = catchAsync(async (req, res, next) => {
  const trip = await Trip.find(req.query);

  if (trip.length == 0) {
    return next(new AppError("No Trip Found", 404));
  }

  res.json(trip);
});

exports.getTripById = catchAsync(async (req, res, next) => {
  const trip = await Trip.findById(req.params.id).populate("busId");
  if (trip.length == 0) {
    return next(new AppError("No Trip Found", 404));
  }

  res.json(trip);
});

exports.getExclusiveTrips = catchAsync(async (req, res, next) => {
  const exclusiveTrips = await Trip.find({ type: "exclusive" }).populate([
    { path: "busId" },
  ]);

  res.json(exclusiveTrips);
});

exports.getRegularTrips = catchAsync(async (req, res, next) => {
  try {
    const regularTrips = await Trip.find({ type: "regular" }).populate([
      {
        path: "busId",
        // populate: {
        //     path: 'Bus',
        //     select: 'busNumber'
        // }
      },
    ]);

    res.status(200).json(regularTrips);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//scheduler for regular trips
cron.schedule(
  "0 0 * * 0",
  () => {
    const scheduleRegularTrips = async () => {
      const regularTrips = await Trip.find({ type: "regular" }).populate([
        {
          path: "busId",
        },
      ]);

      for (let i = 0; i < regularTrips.length; i++) {
        let tempBus = await Bus.findOne({ _id: regularTrips[i].busId._id });
        let operator = tempBus.operatorId;
        operator = await Operator.findOne({ _id: operator });
        const trip = new Trip({
          busId: regularTrips[i].busId._id,
          departureTime: regularTrips[i].departureTime,
          arrivalTime: regularTrips[i].arrivalTime,
          price: regularTrips[i].price,
          routeTo: regularTrips[i].routeTo,
          routeFrom: regularTrips[i].routeFrom,
          type: regularTrips[i].type,
          transit: regularTrips[i].transit,
          daysOfWeek: regularTrips[i].daysOfWeek,
        });

        let addedTrip = await trip.save();
        addedTrip = await addedTrip.populate("busId");

        operator.tripId.push(addedTrip._id);

        await operator.save();
        console.log(addedTrip);
      }
      console.log("Automatically added");
    };

    scheduleRegularTrips();
  },
  {
    scheduled: true,
    timezone: "Asia/Dubai",
  }
);

exports.addTrip = catchAsync(async (req, res, next) => {
  let {
    busId,
    price,
    departureTime,
    arrivalTime,
    routeTo,
    routeFrom,
    daysOfWeek,
    transit,
    type,
  } = req.body;
  console.log("BUSID");
  console.log(busId);

  let user = await User.findById(req.user.id);

  /*   if (user.role !== "admin") {
    return next(new AppError("Unauthorized", 403));
  } */

  if (!busId) {
    return next(new AppError("Please provide The Bus Id", 400));
  }

  if (!price) {
    return next(new AppError("Please Provide the Fare"));
  }

  if (!(arrivalTime && departureTime)) {
    return next(new AppError("Provide the Arrival And Departure Time."));
  }

  if (!(routeFrom && routeTo)) {
    return next(new AppError("Provide the Route For The Journey"));
  }

  if (!daysOfWeek) {
    return next(new AppError("Provide days you want this trip to recur"));
  }

  let tempBus = await Bus.findOne({ _id: busId });

  let operator = tempBus.operatorId;
  operator = await Operator.findOne({ _id: operator });

  console.log("operator", operator);

  if (!operator) {
    return next(new AppError("Invalid Operator", 403));
  }

  if (type == "regular") {
    const trip = new Trip({
      busId,
      departureTime,
      arrivalTime,
      price,
      routeTo,
      routeFrom,
      daysOfWeek,
      transit,
      type,
    });
    let addedTrip = await trip.save();
    addedTrip = await addedTrip.populate("busId");

    operator.tripId.push(addedTrip._id);

    await operator.save();

    res.json(addedTrip);
  } else {
    const trip = new Trip({
      busId,
      departureTime,
      arrivalTime,
      price,
      routeTo,
      routeFrom,
      type,
      transit,
    });

    let addedTrip = await trip.save();
    addedTrip = await addedTrip.populate("busId");

    operator.tripId.push(addedTrip._id);

    await operator.save();

    res.json(addedTrip);
  }
});

exports.updateTrip = catchAsync(async (req, res, next) => {
  const {
    busId,
    price,
    departureTime,
    arrivalTime,
    routeTo,
    routeFrom,
    daysOfWeek,
    transit,
    type,
  } = req.body;

  let user = await User.findById(req.user.id);
  /* 
  if (user.role !== "admin") {
    return next(new AppError("Unauthorized", 403));
  } */

  if (!busId) {
    return next(new AppError("Please provide The Bus Id", 400));
  }

  if (!price) {
    return next(new AppError("Please Provide the Fare"));
  }

  if (!(arrivalTime && departureTime)) {
    return next(new AppError("Provide the Arrival And Departure Time."));
  }

  if (!(routeFrom && routeTo)) {
    return next(new AppError("Provide the Route For The Journey"));
  }

  if (!daysOfWeek) {
    return next(new AppError("Provide days you want this trip to recur"));
  }

  let tempBus = await Bus.findOne({ _id: busId });

  let operator = tempBus.operatorId;
  operator = await Operator.findOne({ _id: operator });

  console.log("operator", operator);

  if (!operator) {
    return next(new AppError("Invalid Operator", 403));
  }

  if (type == "regular") {
    const updatedTrip = await Trip.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updatedTrip) {
      return next(new AppError("Invalid Trip Id Provided", 404));
    }

    res.json({
      success: true,
      message: "Trip Updated Succesfully",
      updatedTrip,
    });
  } else {
    const updatedTrip = await Trip.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updatedTrip) {
      return next(new AppError("Invalid Trip Id Provided", 404));
    }

    res.json({
      success: true,
      message: "Trip Updated Succesfully",
      updatedTrip,
    });
  }

  const updatedTrip = await Trip.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!updatedTrip) {
    return next(new AppError("Invalid Trip Id Provided", 404));
  }
  res.json({ success: true, message: "Trip Updated Succesfully", updatedTrip });
});

exports.removeTrip = catchAsync(async (req, res, next) => {
  const removedTrip = await Trip.findByIdAndRemove(req.params.id);

  if (!removedTrip) {
    return next(new AppError("Invalid Bus Id Provided"));
  }

  res.json({ success: true, message: "Trip removed Succesfully", removedTrip });
});

// exports.getTripDetails = catchAsync(async (req, res, next) => {
//     const tripDetails = await Trip.findById(req.params.id).populate('operatorId');
//     if (!tripDetails) {
//         return next(
//             new AppError('Invalid Trip Id Provided')
//         )
//     }
//     res.json({ success: true, tripDetails })
// })

// exports.disableSeats = catchAsync(async (req, res, next) => {
//     const { busId, seats } = req.body;
//     const bus = await Bus.findById(busId);
//     if (!bus) {
//         return next(
//             new AppError('Invalid Bus Id Provided')
//         )
//     }
//     if (!seats) {
//         return next(
//             new AppError('Please Provide Atleast One Seat to Perform Disable Operation')
//         )
//     }
//     for (let i = 0; i < seats.length; i++) {
//         if (bus.occupiedSeats.includes(seats[i])) {
//             return next(
//                 new AppError("Occupied Seat Can't Be Disabled")
//             )
//         }
//     }
//     bus.disabledSeats = bus.disabledSeats.concat(seats);
//     bus.occupiedSeats.sort(function (a, b) {
//         return a - b;
//     });
//     bus.availableSeats = bus.totalSeats - bus.occupiedSeats.length
//     await bus.save();
//     res.json({ success: true, message: "Seats Disabled Successfully" })
// })
