const token = require("../controllers/handleRefreshToken");
const express = require("express");
const router = express.Router();

router.route("/").post(token);

module.exports = router;
