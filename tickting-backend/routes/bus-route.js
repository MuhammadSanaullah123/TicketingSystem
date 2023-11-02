const router = require("express").Router();
const upload = require("../middlewares/multer");
const busController = require("../controller/busController");
const checkAuth = require("../middlewares/checkAuth");
const restrictTo = require("../middlewares/restrictTo");

router
  .route("/")
  .get(busController.getBus)
  .post(
    checkAuth,
    restrictTo("admin", "operator"),
    upload.single("image"),
    busController.addBus
  );

router
  .route("/:id")
  .patch(
    checkAuth,
    restrictTo("admin", "operator"),
    upload.single("image"),
    busController.updateBus
  )
  .delete(checkAuth, restrictTo("admin", "operator"), busController.removeBus);

router.route("/busDetails/:id").get(busController.getBusDetails);

router
  .route("/disableSeats")
  .post(checkAuth, restrictTo("admin", "operator"), busController.disableSeats);

module.exports = router;
