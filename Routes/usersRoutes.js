const express = require("express");
const { authUser, signupUser } = require("../Controllers/UsersController");
const router = express.Router();

router.route("/login").post(authUser);

router.post("/signup", signupUser);

module.exports = router;
