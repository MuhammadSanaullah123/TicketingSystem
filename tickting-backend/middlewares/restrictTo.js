const AppError = require("../utils/appError");
const User = require("../models/User");
const Operator = require("../models/Operator");
// apply restricting to specific members
module.exports = (...role) => {
  //  roles is an array like ['admin','lead-guide'] using res-parameter syntax
  return async (req, res, next) => {
    const user = await User.findById(req.user.id);

    if (!role.includes(user.role)) {
      return next(
        new AppError("you do not have permission to perform this action", 401)
      );
    }
    if (user.role === "operator") {
      const operator = await Operator.findOne({ userId: user.id });
      if (!operator.isVerified) {
        return next(
          new AppError("Please Wait for the Admin to Approve Your Request", 401)
        );
      }
    }
    next();
  };
};
