const router = require('express').Router()
const upload = require("../middlewares/multer");
const tripController = require('../controller/tripController')
const checkAuth = require('../middlewares/checkAuth')
const restrictTo = require('../middlewares/restrictTo')

router
    .route("/")
    .get(tripController.getTrip)
    .post(checkAuth, restrictTo('admin', 'operator'), tripController.addTrip)

router 
    .route("/exclusive-trips")
    .get(tripController.getExclusiveTrips)

router
    .route("/regular-trips")
    .get(tripController.getRegularTrips)

router
    .route("/:id")
    .patch(checkAuth, restrictTo('admin', 'operator'), tripController.updateTrip)
    .delete(checkAuth, restrictTo('admin', 'operator'), tripController.removeTrip)
    .get(tripController.getTripById)
// router
//     .route('/busDetails/:id')
//     .get(busController.getBusDetails)

// router
//     .route('/disableSeats')
//     .post(checkAuth, restrictTo('admin', 'operator'), busController.disableSeats)

module.exports = router