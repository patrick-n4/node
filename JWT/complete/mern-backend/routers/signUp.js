const signUp = require("../controllers/handleSignUp");
const express = require("express");
const router = express.Router();

router.route("/").post(signUp);

module.exports = router;
