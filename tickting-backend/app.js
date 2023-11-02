const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
// const morgan = require('morgan');
const upload = require("./middlewares/multer");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const path = require("path");
const hpp = require("hpp");
const authRoute = require("./routes/auth-route");
const passport = require("passport");
const session = require("express-session");
const passportSetup = require("./config/passport-setup");
const cookieSession = require("cookie-session");

const tripRoute = require("./routes/trip-route");
const requestRoute = require("./routes/request-route");

const busRoute = require("./routes/bus-route");
const walletRoute = require("./routes/wallet-route");
const operatorRoute = require("./routes/operator-route");
const bookingRoute = require("./routes/booking-routes");
const adminRoute = require("./routes/admin-route");
const reviewRoute = require("./routes/review-route");
// const formData = require('express-form-data');
// const formidable = require('express-formidable')
const cron = require("node-cron");
const {
  addWeeks,
  startOfYear,
  endOfYear,
  startOfWeek,
  format,
} = require("date-fns");
const Trip = require("./models/Trip");
const { addDays } = require("date-fns");

//Import routes

const globalErrorHandler = require("./middlewares/globalErrorHandler");

const AppError = require("./utils/appError");

var cookieParser = require("cookie-parser");

// view engine setup

// var whitelist = ['http://example1.com', 'http://example2.com']
// var corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }
// app.use(cors(corsOptions))

app.use(express.json());
app.use(cookieParser());
app.use(
  cookieSession({
    name: "session",
    keys: ["cyberwolve"],
    maxAge: 24 * 60 * 60 * 100,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// set security http headers
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// if (process.env.NODE_ENV === 'development') {
//   app.use(morgan('dev'));
// }

//  CORS
// origin: "http://localhost:5173",
app.use(
  cors({
    origin: "*",
    methods: "GET,POST,PATCH,DELETE",
    credentials: true,
  })
);

cron.schedule(
  "21 14 * * *",
  async () => {
    try {
      console.log("Starting...");
      const unprocessedTrips = await Trip.find({ processed: false });
      const createdTrips = [];

      // Set to track processed combinations
      const processedCombinations = new Set();

      // Iterate over each trip
      for (const existingTrip of unprocessedTrips) {
        // Mark the trip as processed
        existingTrip.processed = true;
        await existingTrip.save();

        // Check if the type is regular
        if (existingTrip.type === "regular") {
          console.log("Trip type is regular");

          // Get the current date
          const currentDate = new Date();

          // Define the start and end of the year
          const yearStart = startOfYear(currentDate);
          const yearEnd = endOfYear(currentDate);

          // Initialize the current week to the start of the year
          let currentWeek = startOfWeek(yearStart);
          while (currentWeek <= yearEnd) {
            // Iterate over the next 7 days
            for (let i = 0; i < existingTrip.daysOfWeek.length; i++) {
              const nextDate = addDays(currentDate, i);
              const formattedDay = format(nextDate, "dddd");

              // Create a unique key for the combination of busId and day
              const combinationKey = `${existingTrip.busId}-${formattedDay}`;

              // Check if the combination has already been processed
              if (!processedCombinations.has(combinationKey)) {
                // Add the combination to the set to mark it as processed
                processedCombinations.add(combinationKey);

                console.log(
                  "Processing for:",
                  existingTrip.busId,
                  formattedDay
                );

                const newTrip = new Trip({
                  busId: existingTrip.busId,
                  departureTime: existingTrip.departureTime,
                  arrivalTime: existingTrip.arrivalTime,
                  routeFrom: existingTrip.routeFrom,
                  routeTo: existingTrip.routeTo,
                  daysOfWeek: [formattedDay], // Change to an array
                  price: existingTrip.price,
                  type: existingTrip.type,
                  processed: true,
                  regularTrips: true,
                });

                console.log("New trip:", newTrip);
                createdTrips.push(await newTrip.save());
              }
            }
          }
        }
      }

      console.log("Created trips:", createdTrips);
    } catch (error) {
      console.error("Error creating recurring trips:", error);
    }
  },
  {
    timezone: "Asia/Karachi", // Set your timezone
  }
);

//  set limit request from same API in timePeroid from same ip
const limiter = rateLimit({
  max: 10000, //   max number of limits
  windowMs: 60 * 60 * 1000, // hour
  message: " Too many req from this IP , please Try  again in an Hour ! ",
});

app.use("/api", limiter);

//  Body Parser  => reading data from body into req.body protect from scraping etc
app.use(express.json({ limit: "10kb" }));

// Data sanitization against NoSql query injection
app.use(mongoSanitize()); //   filter out the dollar signs protect from  query injection attact

// Data sanitization against XSS
app.use(xss()); //    protect from molision code coming from html

// testing middleware
app.use((req, res, next) => {
  next();
});

// app.use(formData.parse());
// app.use(formidable())
// app.use(upload.single('image'))
// routes
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use("/api/auth", authRoute);
app.use("/api/bus", busRoute);
app.use("/api/bookings", bookingRoute);
app.use("/api/operator", operatorRoute);
app.use("/api/wallet", walletRoute);
app.use("/api/admin", adminRoute);
app.use("/api/review", reviewRoute);
app.use("/api/trip", tripRoute);
app.use("/api/request", requestRoute);

// handling all (get,post,update,delete.....) unhandled routes
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on the server`, 404));
});

// error handling middleware
app.use(globalErrorHandler);

module.exports = app;
