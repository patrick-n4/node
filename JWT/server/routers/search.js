const express = require("express");
const handleSearch = require("../controllers/handleSearch");
const router = express.Router();

router.route("/").post(handleSearch);

module.exports = router;