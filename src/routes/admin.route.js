const express = require("express");
const admin = require("../controllers/admin.controller");
const router = express.Router();
// creating routes to the endpoints
router.post("/register-admin", admin.adminRegistration);
router.post("/admin-login", admin.adminLogin);
// exporting all routes
module.exports = router;
