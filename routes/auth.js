const express = require("express");
const controller = require("./../controllers");
const router = express.Router();

router.post("/signup", controller.authController.signupWithEmailandPassword);
router.post("/sendotp", controller.authController.sendOtp);
router.post("/signin", controller.authController.signinWithEmailPassword);
router.post("/signinwithotp", controller.authController.signinWithOtp);
router.post("/signout", controller.authController.signout);
router.post("/forgotpassword", controller.authController.forgotPassword);
router.post(
  "/resetpassword/:resetToken",
  controller.authController.resetPassword
);
router.post("/updatepassword", controller.authController.updatePassword);

module.exports = router;
