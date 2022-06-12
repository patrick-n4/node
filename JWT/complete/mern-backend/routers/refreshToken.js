const token = require("../controllers/handleToken");
const express = require("express");
const router = express.Router();

router.route("/").post(token);

module.exports = router;