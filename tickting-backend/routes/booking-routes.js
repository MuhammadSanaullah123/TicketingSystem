const router = require("express").Router();
const checkAuth = require("../middlewares/checkAuth");
const bookingController = require("../controller/bookingController");
const restrictTo = require("../middlewares/restrictTo");
const upload = require("../middlewares/multer");

router
  .route("/bookSeats")
  .post(checkAuth, upload.array("passports", 10), bookingController.getSeats);

router
  .route("/bookSeatsGuest")
  .post(upload.array("passports", 10), bookingController.bookSeatsWithoutLogin);

router.route("/verifyPayment").post(bookingController.verifySeats);

router
  .route("/myBookings")
  .get(
    checkAuth,
    restrictTo("admin", "operator"),
    bookingController.myBookings
  );

router
  .route("/:id")
  .get(checkAuth, bookingController.getParticularBooking)
  .patch(checkAuth, bookingController.updateBooking);

router
  .route("/cancelBooking/:id")
  .patch(checkAuth, bookingController.cancelBooking);

router.route("/guestBooking/:id").get(bookingController.getBooking);

module.exports = router;
