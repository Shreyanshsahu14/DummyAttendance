const express=require("express");
const router=express.Router();
const {
    signup,
    login,
    sendotp,
    changePassword,
}=require("../controllers/Auth");
const {
    resetPasswordToken,
    resetPassword,
  } = require("../controllers/resetPassword")

router.post("/signup",signup);
router.post("/login", login);
router.post("/sendotp", sendotp);
router.post("/changepassword", changePassword)

router.post("/reset-password-token", resetPasswordToken)

// Route for resetting user's password after verification
router.post("/reset-password", resetPassword)


module.exports=router;