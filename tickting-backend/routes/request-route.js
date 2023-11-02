const router = require("express").Router();
const requestController = require("../controller/requestController");
const checkAuth = require("../middlewares/checkAuth");
const restrictTo = require("../middlewares/restrictTo");

router
  .route("/")
  .get(requestController.getAllRequest)
  .post(requestController.addRequest);

router
  .route("/:id")
  .patch(checkAuth, restrictTo("admin"), requestController.updateRequest)
  .delete(checkAuth, restrictTo("admin"), requestController.removeRequest)
  .get(requestController.getRequestById);

module.exports = router;
