const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const checkAuth = (req, res, next) => {
  try {
    let token;
    if (req.headers["x-auth-token"]) {
      token = req.headers["x-auth-token"];
    } else if (req.headers["auth"]) {
      token = req.headers["auth"];
    }

    if (!token) {
      res.status(401).json({ success: false, message: "Unauthorised" });
    }

    const data = jwt.verify(token, process.env.JWT_SECRET);

    req.user = data.user;

    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error });
  }
};

module.exports = checkAuth;
