const express = require("express");
const user = require("../controllers/user.controller");
const authorization = require("../middlewares/auth.middleware");
const router = express.Router();
// creating routes to the endpoints
router.post("/register-user", user.userRegistration);
router.post("/user-login", user.userLogin);
router.get(
  "/search-user",
  authorization.authorization,
  authorization.isAdmin,
  user.fetchUser
);
router.get(
  "/all-users",
  authorization.authorization,
  authorization.isAdmin,
  user.allUsers
);
router.post("/verify-user", user.verifyEmail);
router.post("/resend-verification-link", user.resendVerificationMail);
router.post("/password-reset-url", user.forgetPasswordLink);
router.patch("/change-user-password", user.changePassword);
router.patch("/reset-password", user.resetPassword);
// exporting all routes
module.exports = router;
