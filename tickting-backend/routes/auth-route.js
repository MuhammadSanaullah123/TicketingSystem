const router = require('express').Router()
const passport = require('passport')
const checkAuth = require('../middlewares/checkAuth');
const userController = require('../controller/userController');
const restrictTo = require('../middlewares/restrictTo');
const authController = require('../controller/authController')
const upload = require('../middlewares/multer')
const createToken = require('../utils/createToken')

router
    .route("/login")
    .post(userController.loginUser)

router
    .route("/createUser")
    .post(userController.createUser)


router
    .route("/updateUser/:id")
    .patch(checkAuth, upload.single('image'), userController.updateUser)

router
    .route("/removeUser/:id")
    .delete(checkAuth, restrictTo('admin'), userController.removeUser)

router
    .route("/getUser")
    .get(checkAuth, userController.getUser)

/* GOOGLE OAUTH TESTING */
router.get("/login/success", (req, res) => {
    if (req.user) {
        console.log(req.user)
        const authToken = createToken(req.user._id)
        res.status(200).json({ success: true, token : authToken, user: req.user });

    } else {
        console.log("sdjkfl")
        res.status(403).json({ error: true, message: "Not Authorized" });
    }
});

router.get("/login/failed", (req, res) => {
    res.status(401).json({
        error: true,
        message: "Log in failure",
    });
});

router.get("/google", passport.authenticate("google", ["profile", "email"]));

router.get(
    "/google/redirect",
    passport.authenticate("google", {
        successRedirect: "http://127.0.0.1:5173?google=true",
        failureRedirect: "/login/failed",
    })
);


/* Facebook OAUTH TESTING */
router.get("/facebook", passport.authenticate("facebook", { scope: ["profile"] }));

router.get(
    "/facebook/redirect",
    passport.authenticate("facebook", {
        successRedirect: process.env.CLIENT_URL || "http://localhost:3000",
        failureRedirect: "/login/failed",
    })
);


router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("http://localhost:3000");
});


router
    .route('/forgotPassword')
    .post(authController.forgotPassword)

router
    .route('/resetPassword')
    .post(authController.resetPassword)


router
    .route('/changeRole/:id')
    .patch(checkAuth, restrictTo('admin'), authController.changeRole)

module.exports = router