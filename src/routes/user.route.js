const express = require("express");
const user = require("../controllers/user.controller");
const authorization = require("../middlewares/auth.middleware");
const router = express.Router();
// creating routes to the endpoints
router.post( "/register-user", user.userRegistration );
router.post( "/user-login", user.userLogin );
router.get( "/search-user", 
            authorization.authorization, 
            authorization.isAdmin, 
            user.fetchUser);
router.get( "/all-users", 
            authorization.authorization, 
            authorization.isAdmin, 
            user.allUsers);
// exporting all routes
module.exports = router;
