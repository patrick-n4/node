const express = require("express");
const home = require("../controllers/handleHome");
const router = express.Router();

router.route("/:id").get(home);

module.exports = router;
