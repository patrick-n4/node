const express = require("express");
const home = require("../controllers/handleHome");
const router = express.Router();

router.route("/").post(home);

module.exports = router;
    