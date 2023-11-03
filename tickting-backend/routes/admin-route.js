const router = require("express").Router();
const upload = require("../middlewares/multer");
const adminController = require("../controller/adminController");
const checkAuth = require("../middlewares/checkAuth");
const restrictTo = require("../middlewares/restrictTo");

router.route("/createAdmin").post(adminController.setAdminDetails);

router.route("/login").post(adminController.loginAdmin);

router
  .route("/operatorList")
  .get(checkAuth, restrictTo("admin"), adminController.getOperatorList);

router
  .route("/customer")
  .get(checkAuth, restrictTo("admin", "operator"), adminController.getCustomer);

router
  .route("/recentBookings")
  .get(
    checkAuth,
    restrictTo("admin", "operator"),
    adminController.getRecentBookings
  );

router
  .route("/salesOverview")
  .get(checkAuth, restrictTo("admin"), adminController.getSalesDetails);

router
  .route("/bus")
  .get(checkAuth, restrictTo("admin", "operator"), adminController.getBuses);

router
  .route("/bookings")
  .get(checkAuth, restrictTo("admin", "operator"), adminController.getBookings);

router
  .route("/coupon")
  .post(
    checkAuth,
    restrictTo("admin", "operator"),
    upload.single("image"),
    adminController.addCoupon
  )
  .get(checkAuth, restrictTo("admin", "operator"), adminController.getCoupon);

router
  .route("/deleteUser/:id")
  .delete(checkAuth, restrictTo("admin"), adminController.deleteUser);

router
  .route("/toggleReview/:id")
  .patch(
    checkAuth,
    restrictTo("admin", "operator"),
    adminController.toggleHideReview
  );

router
  .route("/verifyOperator/:id")
  .post(checkAuth, restrictTo("admin"), adminController.verifyOperator);

router
  .route("/coupon/:id")
  .patch(
    checkAuth,
    restrictTo("admin", "operator"),
    upload.single("image"),
    adminController.updateCoupon
  )
  .delete(
    checkAuth,
    restrictTo("admin", "operator"),
    adminController.deleteCoupon
  );

router
  .route("/update-user/:id")
  .patch(checkAuth, restrictTo("admin"), adminController.updateUser);

router
  .route("/update-operator/:id")
  .patch(checkAuth, restrictTo("admin"), adminController.updateOperator);

router.route("/operator/all").get(adminController.getOperators);

module.exports = router;
