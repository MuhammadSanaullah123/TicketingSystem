const router = require("express").Router();
const upload = require("../middlewares/multer");
const operatorController = require("../controller/operatorController");
const adminController = require("../controller/adminController");
const bookingController = require("../controller/bookingController");
const checkAuth = require("../middlewares/checkAuth");
const restrictTo = require("../middlewares/restrictTo");

router.route("/createOperator").post(operatorController.setOperatorDetails);

router.route("/login").post(operatorController.loginOperator);

router
  .route("/recentBookings")
  .get(checkAuth, restrictTo("operator"), operatorController.getRecentBookings);

router
  .route("/salesOverview")
  .get(checkAuth, restrictTo("operator"), operatorController.getSalesDetails);

router
  .route("/customer")
  .get(
    checkAuth,
    restrictTo("operator"),
    operatorController.getCustomerDetails
  );

router
  .route("/bus")
  .get(checkAuth, restrictTo("operator"), operatorController.getBuses);

router
  .route("/bookings")
  .get(checkAuth, restrictTo("operator"), operatorController.getBookingDetails);

router
  .route("/coupon")
  .post(
    checkAuth,
    restrictTo("operator", "admin"),
    upload.single("image"),
    operatorController.addCoupon
  )
  .get(
    checkAuth,
    restrictTo("operator", "admin"),
    operatorController.getCoupon
  );

router
  .route("/assignSeats/:id")
  .post(checkAuth, restrictTo("operator"), bookingController.assignSeats);

router
  .route("/coupon/:id")
  .patch(
    checkAuth,
    restrictTo("operator", "admin"),
    upload.single("image"),
    operatorController.updateCoupon
  )
  .delete(
    checkAuth,
    restrictTo("operator", "admin"),
    operatorController.deleteCoupon
  );

router
  .route("/:id")
  .get(operatorController.getOperatorDetails)
  .patch(
    checkAuth,
    restrictTo("operator", "admin"),
    adminController.updateOperator
  );

module.exports = router;
